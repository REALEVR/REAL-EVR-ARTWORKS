from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta
import os
import shutil
from pathlib import Path

from database import get_db, create_tables
from models import User, Gallery, Artwork
from schemas import UserCreate, UserLogin, User as UserSchema, GalleryCreate, Gallery as GallerySchema, ArtworkCreate, Artwork as ArtworkSchema, GalleryWithArtworks
from auth import authenticate_user, create_access_token, get_password_hash, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES

app = FastAPI(title="REALEVR ART WORKS API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
uploads_dir = Path("uploads")
uploads_dir.mkdir(exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Serve React frontend
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # If it's an API route, let it be handled by FastAPI
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        # For all other routes, serve the React app
        from fastapi.responses import FileResponse
        return FileResponse("dist/index.html")

# Create database tables on startup
@app.on_event("startup")
def startup_event():
    create_tables()

# User endpoints
@app.post("/api/users/register", response_model=dict)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
        bio=user.bio,
        profile_image=user.profile_image
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": UserSchema.from_orm(db_user)}

@app.post("/api/users/login", response_model=dict)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": UserSchema.from_orm(db_user)}

@app.get("/api/users", response_model=List[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.get("/api/users/{user_id}", response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Gallery endpoints
@app.post("/api/galleries", response_model=GallerySchema)
async def create_gallery(
    title: str = Form(...),
    description: str = Form(None),
    style: str = Form(None),
    cover_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Handle file upload
    cover_image_path = None
    if cover_image and cover_image.filename:
        file_extension = cover_image.filename.split(".")[-1]
        filename = f"gallery_{current_user.id}_{title.replace(' ', '_')}.{file_extension}"
        file_path = uploads_dir / filename
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(cover_image.file, buffer)
        
        cover_image_path = f"/uploads/{filename}"
    
    # Create gallery
    db_gallery = Gallery(
        title=title,
        description=description,
        style=style,
        cover_image=cover_image_path,
        user_id=current_user.id
    )
    db.add(db_gallery)
    db.commit()
    db.refresh(db_gallery)
    
    return GallerySchema.from_orm(db_gallery)

@app.get("/api/galleries", response_model=List[GallerySchema])
def get_galleries(db: Session = Depends(get_db)):
    galleries = db.query(Gallery).all()
    return galleries

@app.get("/api/galleries/featured", response_model=List[GallerySchema])
def get_featured_galleries(db: Session = Depends(get_db)):
    galleries = db.query(Gallery).filter(Gallery.is_featured == True).all()
    return galleries

@app.get("/api/galleries/{gallery_id}", response_model=GalleryWithArtworks)
def get_gallery(gallery_id: int, db: Session = Depends(get_db)):
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return gallery

@app.get("/api/users/{user_id}/galleries", response_model=List[GallerySchema])
def get_user_galleries(user_id: int, db: Session = Depends(get_db)):
    galleries = db.query(Gallery).filter(Gallery.user_id == user_id).all()
    return galleries

# Artwork endpoints
@app.post("/api/artworks", response_model=ArtworkSchema)
async def create_artwork(
    title: str = Form(...),
    description: str = Form(None),
    medium: str = Form(None),
    dimensions: str = Form(None),
    year: int = Form(None),
    price: str = Form(None),
    gallery_id: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify gallery ownership
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id, Gallery.user_id == current_user.id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found or access denied")
    
    # Handle file upload
    if not image.filename:
        raise HTTPException(status_code=400, detail="No image file provided")
    
    file_extension = image.filename.split(".")[-1]
    filename = f"artwork_{current_user.id}_{title.replace(' ', '_')}.{file_extension}"
    file_path = uploads_dir / filename
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    image_url = f"/uploads/{filename}"
    
    # Create artwork
    db_artwork = Artwork(
        title=title,
        description=description,
        medium=medium,
        dimensions=dimensions,
        year=year,
        price=price,
        gallery_id=gallery_id,
        user_id=current_user.id,
        image_url=image_url
    )
    db.add(db_artwork)
    db.commit()
    db.refresh(db_artwork)
    
    return ArtworkSchema.from_orm(db_artwork)

@app.get("/api/artworks/{artwork_id}", response_model=ArtworkSchema)
def get_artwork(artwork_id: int, db: Session = Depends(get_db)):
    artwork = db.query(Artwork).filter(Artwork.id == artwork_id).first()
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    return artwork

@app.get("/api/galleries/{gallery_id}/artworks", response_model=List[ArtworkSchema])
def get_gallery_artworks(gallery_id: int, db: Session = Depends(get_db)):
    artworks = db.query(Artwork).filter(Artwork.gallery_id == gallery_id).all()
    return artworks

@app.get("/api/users/{user_id}/artworks", response_model=List[ArtworkSchema])
def get_user_artworks(user_id: int, db: Session = Depends(get_db)):
    artworks = db.query(Artwork).filter(Artwork.user_id == user_id).all()
    return artworks

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)