#!/usr/bin/env python3
"""
Database migration script to create tables in PostgreSQL
"""

from database import engine
from models import Base

def migrate_database():
    """Create all tables in the PostgreSQL database"""
    try:
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("SUCCESS: Database tables created successfully!")

        # Verify tables were created
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"Created tables: {tables}")

    except Exception as e:
        print(f"ERROR: Error creating database tables: {e}")
        return False

    return True

if __name__ == "__main__":
    migrate_database()