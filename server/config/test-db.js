import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../.env') }); // adjust if your .env is in project root

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

const testConnection = async () => {
  try {
    const result = await sql`SELECT NOW() AS now`;
    console.log('✅ Database connected successfully at:', result[0].now);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
};

testConnection();