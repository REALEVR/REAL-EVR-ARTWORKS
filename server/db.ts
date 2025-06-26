import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "@shared/schema";

const databaseUrl = "postgresql://postgres.ehhigfsjtrhiyatwcmwh:Ranking%40ivan12@aws-0-eu-north-1.pooler.supabase.com:6543/postgres";

export const connection = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle(connection, { schema });