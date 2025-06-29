#!/usr/bin/env python3
import os
import sys
import uvicorn
from pathlib import Path

# Add backend to Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Import the FastAPI app
from main import app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting REALEVR ART WORKS Python backend on port {port}")
    print("Backend: FastAPI + SQLAlchemy")
    print("Database: Supabase PostgreSQL")
    print("Authentication: JWT tokens")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        reload=True,
        reload_dirs=[str(backend_dir)]
    )