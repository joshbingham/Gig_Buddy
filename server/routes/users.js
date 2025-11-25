/**
 * USERS ROUTES - User Management Endpoints
 * 
 * This file contains user-related routes:
 * - List all users (public)
 * - Get user profile details (public)
 * - Get user's gigs (public)
 * - Get user's collections (public)
 * - Update user profile (private)
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DATABASE SCHEMA:
 *    users table: id, name, email, password_hash, bio, avatar_url, 
 *                location, website_url, social_links, role, created_at, updated_at
 * 
 * 2. BUSINESS LOGIC:
 *    - Public user data includes: name, bio, avatar, location, website
 *    - Private user data (for profile updates): email, password, etc.
 *    - Users can view other users' public information
 *    - Only the user themselves can update their profile
 *    - Don't expose sensitive information like email addresses publicly
 * 
 * 3. FEATURES TO IMPLEMENT:
 *    - User profiles with avatar, bio, location
 *    - Social media links (Instagram, Twitter, etc.)
 *    - User statistics (total gigs, collections, etc.)
 *    - Public user discovery
 *    - User following system (optional feature)
 */

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/users - List all users (public)
router.get('/', [
  // TODO: Add validation for query parameters
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('location').optional().isString().withMessage('Location must be a string'),
  query('sort').optional().isIn(['name', 'created_at', 'gigs_count']).withMessage('Invalid sort option')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate query parameters
  // 2. Return only public user information
  // 3. Support search by name
  // 4. Support filtering by location
  // 5. Include user statistics (gigs count, collections count)
  // 6. Handle pagination
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid query parameters',
      details: errors.array()
    });
  }

  // PLACEHOLDER - Add actual implementation
});

// GET /api/users/:id - Get specific user details (public)
router.get('/:id', [
  // TODO: Add validation for user ID
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID
  // 2. Select only public fields from users table
  // 3. Include user statistics
  // 4. Get recent gigs (optional)
  // 5. Get recent collections (optional)
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID',
      details: errors.array()
    });
  }

  const userId = req.params.id;

  // PLACEHOLDER - Add actual implementation
});

// GET /api/users/:id/gigs - Get user's gigs (public)
router.get('/:id/gigs', [
  // TODO: Add validation for user ID and query parameters
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('upcoming').optional().isBoolean().withMessage('upcoming must be boolean')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID and query parameters
  // 2. Get gigs for this specific user
  // 3. Support filtering for upcoming gigs
  // 4. Join with user table to verify user exists
  // 5. Handle pagination
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid parameters',
      details: errors.array()
    });
  }

  const userId = req.params.id;

  // PLACEHOLDER - Add actual implementation
});

// GET /api/users/:id/collections - Get user's public collections (public)
router.get('/:id/collections', [
  // TODO: Add validation for user ID and query parameters
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID and query parameters
  // 2. Get only public collections for this user
  // 3. Include collection statistics (gig count)
  // 4. Join with users table to verify user exists
  // 5. Handle pagination
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid parameters',
      details: errors.array()
    });
  }

  const userId = req.params.id;

  // PLACEHOLDER - Add actual implementation
});

// PUT /api/users/:id - Update user profile (private)
router.put('/:id', authenticateToken, [
  // TODO: Add validation for user ID and profile updates
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must not exceed 500 characters'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location must not exceed 100 characters'),
  body('website_url').optional().isURL().withMessage('Please provide a valid website URL'),
  body('avatar_url').optional().isURL().withMessage('Please provide a valid avatar URL'),
  body('social_links').optional().isObject().withMessage('Social links must be an object')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID and request body
  // 2. Verify user owns this profile (req.user.id === userId)
  // 3. Sanitize social links (Instagram, Twitter, Facebook, etc.)
  // 4. Update user profile in database
  // 5. Return updated user data (excluding sensitive fields)
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const userId = req.params.id;
  
  // TODO: Add ownership check
  
  // PLACEHOLDER - Add actual implementation
});

// POST /api/users/:id/avatar - Upload/update avatar (private)
router.post('/:id/avatar', authenticateToken, [
  // TODO: Add validation for file upload
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID
  // 2. Verify user owns this profile
  // 3. Handle file upload (using multer middleware)
  // 4. Validate file type and size
  // 5. Save file and update avatar_url in database
  // 6. Return updated user data
  
  const userId = req.params.id;
  
  // TODO: Add ownership check and file upload handling
  
  // PLACEHOLDER - Add actual implementation
});

// GET /api/users/:id/stats - Get user statistics (public)
router.get('/:id/stats', [
  // TODO: Add validation for user ID
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate user ID
  // 2. Get user statistics:
  //    - Total gigs created
  //    - Total collections
  //    - Total gigs in collections
  //    - Member since date
  //    - Last activity date
  // 3. Return statistics object
  
  const userId = req.params.id;

  // PLACEHOLDER - Add actual implementation
});

// Additional helper routes (optional):
// GET /api/users/search - Search users by name/bio
// POST /api/users/:id/follow - Follow a user
// DELETE /api/users/:id/follow - Unfollow a user
// GET /api/users/:id/followers - Get user's followers
// GET /api/users/:id/following - Get users being followed

module.exports = router;