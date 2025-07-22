#!/usr/bin/env python3
import uvicorn
import os
import sys
import subprocess
import threading
import time

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def run_frontend():
    """Run the Vite development server for the frontend"""
    try:
        subprocess.run(["npm", "run", "build"], check=True)
        print("Frontend built successfully")
    except subprocess.CalledProcessError as e:
        print(f"Frontend build failed: {e}")

def run_backend():
    """Run the FastAPI backend server"""
    from backend.main import app
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)

if __name__ == "__main__":
    print("Starting REALEVR ART WORKS - Python + React version")
    
    # Build frontend first
    run_frontend()
    
    # Start backend
    run_backend()