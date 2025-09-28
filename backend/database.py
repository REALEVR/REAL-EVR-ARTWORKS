import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Database configuration
DATABASE_URL = "postgresql://real_evr_artworks_user:vp64GoZgTEyFlPjAmKUN4KURQxoJYIll@dpg-d3cip1qli9vc73djqdbg-a.oregon-postgres.render.com/real_evr_artworks"

# Create engine with SSL mode for PostgreSQL connection
engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()