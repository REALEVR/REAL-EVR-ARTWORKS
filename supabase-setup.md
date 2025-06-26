# Supabase Setup Instructions for REALEVR

## Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Set project name: **realevr**
4. Set database name: **artworks**
5. Choose your region (recommend EU North 1 - Stockholm)
6. Set a strong password and save it
7. Click "Create new project"

## Step 2: Get Database URL
1. Once project is created, go to Settings → Database
2. Find "Connection string" section
3. Copy the "Transaction pooler" connection string
4. It will look like: postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres

## Step 3: Provide Connection Details
After creating the project, provide me with:
- The complete connection string with your password
- Or the individual details (host, password, etc.)

I'll then connect the application and set up all the tables automatically.