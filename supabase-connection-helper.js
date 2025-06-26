// Supabase Connection Helper for REALEVR
// This script will help test the Supabase connection once we have the URL

const { Pool } = require('pg');

async function testSupabaseConnection(connectionString) {
  const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Test connection
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Supabase connection successful!');
    console.log('Current time:', result.rows[0].current_time);

    // Create tables for REALEVR
    await createRealEvrTables(pool);
    
    // Create login accounts
    await createLoginAccounts(pool);
    
    console.log('🎨 REALEVR database setup complete!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await pool.end();
  }
}

async function createRealEvrTables(pool) {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      bio TEXT,
      profile_image TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS galleries (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      cover_image TEXT,
      user_id INTEGER NOT NULL,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS artworks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      medium VARCHAR(100),
      image_url TEXT NOT NULL,
      gallery_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`
  ];

  for (const tableSQL of tables) {
    await pool.query(tableSQL);
  }
  console.log('📊 Database tables created successfully');
}

async function createLoginAccounts(pool) {
  const accounts = [
    {
      username: 'realevr_admin',
      password: 'admin123',
      email: 'admin@realevr.com',
      name: 'REALEVR Administrator',
      bio: 'Art Gallery Platform Administrator'
    },
    {
      username: 'artist_demo',
      password: 'demo123',
      email: 'artist@realevr.com',
      name: 'Demo Artist',
      bio: 'Digital Art Creator and Gallery Owner'
    }
  ];

  for (const account of accounts) {
    try {
      await pool.query(
        'INSERT INTO users (username, password, email, name, bio) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (username) DO NOTHING',
        [account.username, account.password, account.email, account.name, account.bio]
      );
    } catch (error) {
      console.log(`Account ${account.username} may already exist`);
    }
  }
  console.log('👤 Login accounts created successfully');
}

module.exports = { testSupabaseConnection };