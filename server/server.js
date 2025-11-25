/**
 * BACKEND API SERVER - Gig Buddy
 * 
 * This will be a Node.js/Express API server for the Gig Buddy application.
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
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import database configuration
const { testConnection } = require('./config/database');

// Import route handlers
const authRoutes = require('./routes/auth');
const gigsRoutes = require('./routes/gigs');
const collectionsRoutes = require('./routes/collections');
const usersRoutes = require('./routes/users');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigsRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/users', usersRoutes);

// 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  // Default error
  let error = {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error = {
      success: false,
      error: 'Validation failed',
      message: 'Request validation failed',
      details: err.details || err.message
    };
    return res.status(400).json(error);
  }

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      error: 'Authentication failed',
      message: 'Invalid or expired token'
    };
    return res.status(401).json(error);
  }

  if (err.code === '23505') { // PostgreSQL unique constraint violation
    error = {
      success: false,
      error: 'Duplicate entry',
      message: 'A record with this information already exists'
    };
    return res.status(409).json(error);
  }

  if (err.code === '23503') { // PostgreSQL foreign key violation
    error = {
      success: false,
      error: 'Invalid reference',
      message: 'Referenced record does not exist'
    };
    return res.status(400).json(error);
  }

  // Return appropriate status code
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json(error);
});

// Server startup
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    console.log('Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database');
      process.exit(1);
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      }
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  console.error('Shutting down server due to Unhandled Promise rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error('Shutting down server due to Uncaught Exception');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;