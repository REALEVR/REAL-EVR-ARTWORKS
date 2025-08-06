#!/usr/bin/env python3
import uvicorn
import os
import sys
import subprocess
import shutil

# Add backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def run_frontend():
    """Build the Vite-based frontend using npm"""
    print("🔧 Building frontend using npm...")
    
    # Check if npm is installed
    if shutil.which("npm") is None:
        print("❌ npm is not installed or not found in PATH. Please install Node.js from https://nodejs.org/")
        sys.exit(1)
    
    try:
        # Use shell=True on Windows to resolve npm
        subprocess.run("npm run build", shell=True, check=True, cwd=os.path.dirname(__file__))
        print("✅ Frontend built successfully.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Frontend build failed: {e}")
        sys.exit(1)

def run_backend():
    """Run the FastAPI backend server with Uvicorn"""
    print("🚀 Starting FastAPI backend...")
    try:
        from backend.main import app
    except ImportError as e:
        print(f"❌ Failed to import backend: {e}")
        sys.exit(1)

    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)

if __name__ == "__main__":
    print("🎨 Starting REALEVR ART WORKS - Python + React version")

    # Step 1: Build the frontend
    run_frontend()

    # Step 2: Start the backend
    run_backend()
