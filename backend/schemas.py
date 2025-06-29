from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str
    name: str
    email: EmailStr
    bio: Optional[str] = None
    profile_image: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Gallery schemas
class GalleryBase(BaseModel):
    title: str
    description: Optional[str] = None
    style: Optional[str] = None
    is_featured: bool = False

class GalleryCreate(GalleryBase):
    pass

class Gallery(GalleryBase):
    id: int
    user_id: int
    cover_image: Optional[str] = None
    created_at: datetime
    owner: User
    
    class Config:
        from_attributes = True

# Artwork schemas
class ArtworkBase(BaseModel):
    title: str
    description: Optional[str] = None
    medium: Optional[str] = None
    dimensions: Optional[str] = None
    year: Optional[int] = None
    price: Optional[str] = None

class ArtworkCreate(ArtworkBase):
    gallery_id: int

class Artwork(ArtworkBase):
    id: int
    gallery_id: int
    user_id: int
    image_url: str
    created_at: datetime
    artist: User
    
    class Config:
        from_attributes = True

# Response schemas
class GalleryWithArtworks(Gallery):
    artworks: List[Artwork] = []

class UserWithGalleries(User):
    galleries: List[Gallery] = []