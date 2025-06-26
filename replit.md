# REALEVR ART WORKS - Virtual Art Gallery Platform

## Overview

REALEVR ART WORKS is a modern web application that enables artists to create and share immersive virtual galleries with audiences worldwide. The platform provides a comprehensive solution for artists to showcase their work, manage collections, and connect with art enthusiasts through digital exhibitions.

## System Architecture

### Full-Stack Structure
- **Frontend**: React with TypeScript, built using Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: TailwindCSS with shadcn/ui components
- **File Uploads**: Multer for artwork and gallery cover images
- **Authentication**: Session-based user management

### Monorepo Organization
The application follows a monorepo structure with clear separation of concerns:
- `client/`: React frontend application
- `server/`: Express.js backend API
- `shared/`: Common schemas and types shared between frontend and backend

## Key Components

### Database Schema (PostgreSQL with Drizzle ORM)
- **Users**: Artist profiles with authentication, bio, and profile images
- **Galleries**: Virtual exhibition spaces owned by users
- **Artworks**: Individual art pieces belonging to galleries
- Relationships: Users → Galleries → Artworks (one-to-many hierarchical structure)

### Frontend Architecture
- **React Router**: wouter for client-side routing
- **State Management**: React Context for user authentication and auth prompts
- **UI Components**: shadcn/ui with Radix UI primitives
- **Forms**: react-hook-form with Zod validation
- **Data Fetching**: TanStack Query for server state management

### Backend API Structure
- RESTful API endpoints for CRUD operations
- File upload handling for images
- Database abstraction layer through storage interface
- Error handling and logging middleware

### Authentication System
- Session-based authentication
- Protected routes with auth prompt modals
- User context management across the application
- Registration and login workflows

## Data Flow

1. **User Registration/Login**: Users create accounts or authenticate to access platform features
2. **Gallery Creation**: Authenticated users create virtual galleries with metadata and cover images
3. **Artwork Upload**: Artists upload artworks to their galleries with detailed information
4. **Content Discovery**: Visitors explore galleries and artworks through browse and search functionality
5. **Virtual Exhibition**: Galleries can be featured and shared as virtual exhibition spaces

## External Dependencies

### Core Framework Dependencies
- React 18 with TypeScript for frontend development
- Express.js for backend API server
- Drizzle ORM for PostgreSQL database operations
- TailwindCSS for styling and design system

### UI and UX Libraries
- Radix UI primitives for accessible component foundations
- shadcn/ui for pre-built component library
- Framer Motion for animations and interactions
- Lucide React for consistent iconography

### Development Tools
- Vite for fast development builds and HMR
- ESBuild for production server bundling
- TypeScript for type safety across the stack

## Deployment Strategy

### Development Environment
- Replit-based development with live reloading
- Environment variables for database configuration
- File serving for uploaded images and assets

### Production Deployment
- Autoscale deployment target on Replit
- Separate build process for client and server
- Static asset serving for uploads and public files
- Environment-based configuration management

### Build Process
1. Client build: Vite compiles React app to static assets
2. Server build: ESBuild bundles TypeScript server code
3. Asset management: Uploaded files stored in uploads directory
4. Database migrations: Drizzle handles schema changes

## Changelog

## Recent Changes
- January 24, 2025: Migrated database from MySQL to PostgreSQL for Replit compatibility
- January 24, 2025: Updated schema to use pg-core instead of mysql-core
- January 24, 2025: Converted database connection to use node-postgres
- January 24, 2025: Project successfully running on Replit environment
- January 24, 2025: User requested Supabase integration for "realevr" project with "artworks" database
- January 24, 2025: Prepared application for Supabase connection with SSL support
- January 24, 2025: Successfully connected to Supabase "realevr" project with "artworks" database
- January 24, 2025: Created database tables and login accounts in Supabase
- January 24, 2025: Updated login/register pages with white background and blue styling
- January 24, 2025: Fixed authentication system and API endpoints

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.