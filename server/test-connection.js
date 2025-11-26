require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
console.log('Testing connection to Supabase database...');
client.connect()
  .then(() => {
    console.log('SUCCESS: Connected successfully!');
    return client.query('SELECT NOW() as current_time');
  })
  .then(res => {
    console.log('Current database time:', res.rows[0].current_time);
  })
  .catch(err => {
    console.error('FAILED: Connection error:', err.message);
  })
  .finally(() => {
    client.end();
  });
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

console.log('Testing connection to Supabase database...');

client.connect()
  .then(() => {
    console.log('SUCCESS: Connected successfully!');
    return client.query('SELECT NOW() as current_time');
  })
  .then(res => {
    console.log('Current database time:', res.rows[0].current_time);
  })
  .catch(err => {
    console.error('FAILED: Connection error:', err.message);
  })
  .finally(() => {
    client.end();
  });
