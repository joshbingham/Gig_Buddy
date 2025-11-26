/**
 * DATABASE CONFIGURATION
 * 
 * This file handles PostgreSQL database connection and configuration.
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DEPENDENCIES TO USE:
 *    - pg (node-postgres) for PostgreSQL connection
 *    - dotenv for environment variables
 * 
 * 2. CONNECTION CONFIGURATION:
 *    - Read connection details from environment variables
 *    - Support for connection pooling
 *    - Connection testing and validation
 *    - Graceful error handling
 * 
 * 3. ENVIRONMENT VARIABLES:
 *    - DATABASE_URL or individual components (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
 *    - DB_SSL (for production)
 *    - DB_MAX_CONNECTIONS (pool size)
 *    - DB_IDLE_TIMEOUT (idle connection timeout)
 * 
 * 4. CONNECTION POOL SETTINGS:
 *    - Max connections: 20 (adjust based on needs)
 *    - Idle timeout: 30 seconds
 *    - Connection timeout: 10 seconds
 * 
 * 5. UTILITY FUNCTIONS:
 *    - executeQuery() for simple queries
 *    - executeTransaction() for transaction handling
 *    - testConnection() for health checks
 *    - closePool() for graceful shutdown
 */

const { Pool } = require('pg');

const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Database connection configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL, // Optional: Supabase URL
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'local_live_gigs',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: process.env.DB_MAX_CONNECTIONS || 20,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 10000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected successfully at:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

// Execute a single query
const executeQuery = async (text, params = []) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text: text.substring(0, 50), duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Execute a transaction
const executeTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Get a client from the pool
const getClient = async () => {
  return await pool.connect();
};

// Close the pool
const closePool = async () => {
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing database pool...');
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing database pool...');
  await closePool();
  process.exit(0);
});

module.exports = {
  pool,
  testConnection,
  executeQuery,
  executeTransaction,
  getClient,
  closePool
};