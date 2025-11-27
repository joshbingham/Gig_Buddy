require('dotenv').config();
const postgres = require('postgres');

console.log('Testing postgres connection...');
console.log('DATABASE_URL:', process.env.DATABASE_URL);

async function testPostgresConnection() {
  try {
    const sql = postgres(process.env.DATABASE_URL, {
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false
    });

    const result = await sql`SELECT NOW() as current_time`;
    console.log('SUCCESS: Connected! Current time:', result[0].current_time);
    
    await sql.end();
  } catch (error) {
    console.error('FAILED: Connection error:', error.message);
  }
}

testPostgresConnection();