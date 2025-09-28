#!/usr/bin/env python3
"""
Test script to verify PostgreSQL connection
"""

from database import engine
from sqlalchemy import text

def test_connection():
    """Test the PostgreSQL connection"""
    try:
        with engine.connect() as conn:
            result = conn.execute(text('SELECT version()'))
            print("SUCCESS: PostgreSQL connection successful!")
            return True
    except Exception as e:
        print(f"ERROR: Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()