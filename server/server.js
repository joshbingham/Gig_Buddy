/**
 * BACKEND API SERVER - Local Live Gigs
 * 
 * This will be a Node.js/Express API server for the Local Live Gigs application.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Run: npm init -y
 * 2. Install dependencies: npm install express cors helmet dotenv pg bcryptjs jsonwebtoken express-rate-limit
 * 3. Install dev dependencies: npm install --save-dev nodemon
 * 4. Set up PostgreSQL database
 * 5. Create .env file with database connection and JWT secrets
 * 6. Run database migrations to create tables
 * 
 * DATABASE SCHEMA:
 * - Users table: id, name, email, password_hash, bio, role, created_at, updated_at
 * - Gigs table: id, title, description, venue, date, genre, price, image_url, user_id, created_at, updated_at
 * - Collections table: id, name, description, user_id, created_at, updated_at
 * - Collection_gigs table: collection_id, gig_id (many-to-many relationship)
 * - Genres table: id, name (for predefined music genres)
 * 
 * API ENDPOINTS TO IMPLEMENT:
 * Authentication:
 *   POST /api/auth/register - Register new user
 *   POST /api/auth/login - User login
 *   GET  /api/auth/me - Get current user info
 *   POST /api/auth/logout - User logout
 * 
 * Gigs (Public/Private):
 *   GET    /api/gigs - Get all gigs (public)
 *   GET    /api/gigs/:id - Get specific gig details
 *   GET    /api/gigs/my - Get user's own gigs (private)
 *   POST   /api/gigs - Create new gig (private)
 *   PUT    /api/gigs/:id - Update gig (private)
 *   DELETE /api/gigs/:id - Delete gig (private)
 * 
 * Collections:
 *   GET    /api/collections - Get all collections (public)
 *   GET    /api/collections/my - Get user's collections (private)
 *   GET    /api/collections/:id - Get specific collection
 *   POST   /api/collections - Create new collection (private)
 *   PUT    /api/collections/:id - Update collection (private)
 *   DELETE /api/collections/:id - Delete collection (private)
 *   POST   /api/collections/:id/gigs/:gigId - Add gig to collection
 *   DELETE /api/collections/:id/gigs/:gigId - Remove gig from collection
 * 
 * Users:
 *   GET /api/users - Get all users (public)
 *   GET /api/users/:id - Get user details (public)
 *   GET /api/users/:id/gigs - Get user's gigs (public)
 *   GET /api/users/:id/collections - Get user's collections (public)
 * 
 * SECURITY FEATURES TO IMPLEMENT:
 * - JWT token authentication
 * - Password hashing with bcrypt
 * - Input validation and sanitization
 * - Rate limiting
 * - CORS configuration
 * - Helmet for security headers
 * 
 * ERROR HANDLING:
 * - Consistent error response format
 * - Proper HTTP status codes
 * - Validation error messages
 * - Database error handling
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware configuration
// TODO: Configure middleware
// - express.json() for parsing JSON bodies
// - cors() for cross-origin requests
// - helmet() for security headers
// - morgan() for request logging (install: npm install morgan)
// - express-rate-limit for rate limiting

// Database connection
// TODO: Set up PostgreSQL database connection using pg module
// - Database configuration from environment variables
// - Connection pooling
// - Connection testing

// Route configuration
// TODO: Import and configure route handlers
// - auth routes (/api/auth/*)
// - gigs routes (/api/gigs/*)
// - collections routes (/api/collections/*)
// - users routes (/api/users/*)

// Error handling middleware
// TODO: Implement global error handling
// - 404 handler
// - Global error handler with proper status codes
// - Validation error handler

// Server startup
const PORT = process.env.PORT || 5000;
// TODO: Start server and test database connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});