/**
 * AUTH ROUTES - Authentication & User Management
 * 
 * This file contains all authentication-related routes:
 * - User registration
 * - User login
 * - User logout
 * - Get current user info
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DEPENDENCIES TO USE:
 *    - express.Router() for route handling
 *    - bcryptjs for password hashing
 *    - jwt for token generation
 *    - express-validator for input validation
 *    - rate limiting middleware
 * 
 * 2. INPUT VALIDATION:
 *    - Email format and uniqueness
 *    - Password strength requirements (min 6 chars)
 *    - Name length requirements (2-50 chars)
 *    - Required field validation
 * 
 * 3. SECURITY FEATURES:
 *    - Password hashing with bcrypt (salt rounds: 12)
 *    - JWT token generation with user ID and role
 *    - Token expiration (24 hours)
 *    - Rate limiting on sensitive endpoints
 * 
 * 4. DATABASE QUERIES:
 *    - User registration: INSERT new user (hash password)
 *    - User login: SELECT user by email, compare password
 *    - Get user: SELECT user by ID (exclude password)
 * 
 * 5. RESPONSE FORMATS:
 *    Success: { success: true, data: {...}, message: string }
 *    Error: { success: false, error: string, details?: object }
 * 
 * 6. HTTP STATUS CODES:
 *    200: Success
 *    201: Created
 *    400: Bad Request (validation errors)
 *    401: Unauthorized (invalid credentials)
 *    404: Not Found
 *    429: Too Many Requests (rate limiting)
 *    500: Server Error
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for auth endpoints
// TODO: Configure rate limits
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Too many authentication attempts, please try again later.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 login attempts per windowMs
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});

// Validation middleware
// TODO: Create validation rules for registration
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters')
];

// TODO: Create validation rules for login
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// POST /api/auth/register - Register new user
router.post('/register', authLimiter, registerValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, password, bio } = req.body;

    // Import database config
    const { executeQuery } = require('../config/database');

    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'User already exists',
        message: 'An account with this email address already exists'
      });
    }

    // Hash password using bcrypt (12 salt rounds)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user into database
    const result = await executeQuery(
      `INSERT INTO users (name, email, password_hash, bio) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, bio, role, created_at`,
      [name, email, passwordHash, bio || null]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with user data (exclude password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          role: user.role,
          created_at: user.created_at
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// POST /api/auth/login - User login
router.post('/login', loginLimiter, loginValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Import database config
    const { executeQuery } = require('../config/database');

    // Find user by email
    const result = await executeQuery(
      'SELECT id, name, email, password_hash, bio, role, created_at FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    const user = result.rows[0];

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with token and user info (exclude password)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          role: user.role,
          created_at: user.created_at
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Get user ID from JWT token (req.user.id)
    const userId = req.user.id;

    // Import database config
    const { executeQuery } = require('../config/database');

    // Fetch user data from database (SELECT, exclude password)
    const result = await executeQuery(
      'SELECT id, name, email, bio, avatar_url, location, website_url, social_links, role, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'The authenticated user could not be found'
      });
    }

    const user = result.rows[0];

    // Return user information
    res.status(200).json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user data',
      message: 'An error occurred while fetching user information'
    });
  }
});

// POST /api/auth/logout - User logout
router.post('/logout', authenticateToken, (req, res) => {
  // For JWT tokens, logout is typically handled client-side
  // The token will expire naturally, but we can blacklist it if needed
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;