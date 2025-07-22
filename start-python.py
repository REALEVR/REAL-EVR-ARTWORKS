#!/usr/bin/env python3
"""
REALEVR ART WORKS - Python + React version
This script starts the FastAPI backend server serving both API and frontend
"""

import os
import sys
import subprocess
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_path))

def build_frontend():
    """Build the React frontend for production"""
    print("Building React frontend...")
    try:
        result = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ Frontend built successfully")
            return True
        else:
            print(f"✗ Frontend build failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"✗ Frontend build error: {e}")
        return False

def start_server():
    """Start the FastAPI server"""
    print("Starting Python FastAPI server...")
    
    # Set port from environment or default to 5000 for Replit compatibility
    port = int(os.getenv("PORT", 5000))
    
    try:
        import uvicorn
        from main import app
        
        print(f"🚀 Starting server on http://0.0.0.0:{port}")
        print("📱 React frontend will be served at the root URL")
        print("🔗 API endpoints available at /api/*")
        
        uvicorn.run(
            app, 
            host="0.0.0.0", 
            port=port, 
            reload=True,
            reload_dirs=[str(backend_path)]
        )
    except ImportError as e:
        print(f"✗ Failed to import backend modules: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Server startup failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("=" * 50)
    print("REALEVR ART WORKS - Python + React")
    print("Virtual Art Gallery Platform")
    print("=" * 50)
    
    # Build frontend first
    if build_frontend():
        # Start the Python backend server
        start_server()
    else:
        print("❌ Cannot start server due to frontend build failure")
        sys.exit(1)