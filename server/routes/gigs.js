/**
 * GIGS ROUTES - Gig Management Endpoints
 * 
 * This file contains all gig-related routes:
 * - Browse all gigs (public)
 * - View specific gig details
 * - User's personal gigs (private)
 * - Create new gig (private)
 * - Update gig (private)
 * - Delete gig (private)
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DATABASE SCHEMA:
 *    gigs table: id, title, description, venue, date, genre, price, 
 *               image_url, user_id, status, created_at, updated_at
 * 
 * 2. VALIDATION RULES:
 *    - title: required, 2-100 characters
 *    - description: optional, max 1000 characters
 *    - venue: required, 2-100 characters
 *    - date: required, valid date (not in past)
 *    - genre: required, from predefined list
 *    - price: optional, positive number or 0 for free
 *    - image_url: optional, valid URL format
 * 
 * 3. BUSINESS LOGIC:
 *    - Users can only modify their own gigs
 *    - All users can view all gigs
 *    - Only authenticated users can create/edit gigs
 *    - Validate venue exists (basic validation)
 *    - Date cannot be in the past
 *    - Price must be positive number or 0
 * 
 * 4. PAGINATION:
 *    - GET /gigs should support pagination
 *    - Query params: ?page=1&limit=12&genre=rock
 *    - Include total count and pagination metadata
 * 
 * 5. SEARCH & FILTERING:
 *    - Search by title or venue
 *    - Filter by genre
 *    - Filter by date range
 *    - Filter by price range
 *    - Sort by date, title, or created_at
 */

// NOTE: Add Swagger JSDoc documentation above each router.method() call for API documentation.
// Example: /** @swagger ... */ above router.get('/', ...)

// =============================================================================
// IMPORTS AND SETUP SECTION
// =============================================================================

 const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for gig creation/update
// TODO: Create comprehensive validation rules
const gigValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('venue')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Venue must be between 2 and 100 characters'),
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      if (value < new Date()) {
        throw new Error('Gig date cannot be in the past');
      }
      return true;
    }),
  body('genre')
    .isIn([
      'Rock', 'Pop', 'Jazz', 'Blues', 'Folk', 'Electronic',
      'Hip Hop', 'Country', 'Classical', 'Punk', 'Metal',
      'Indie', 'Alternative', 'Acoustic', 'Reggae', 'R&B',
      'Soul', 'Funk', 'World Music', 'Experimental'
    ])
    .withMessage('Please select a valid genre'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number or 0'),
  body('image_url')
    .optional()
    .isURL()
    .withMessage('Please provide a valid image URL')
];

// GET /api/gigs - Get all gigs (public) with pagination and filtering
// IMPORTANT! this is supposed to stay commented - JSDoc comment for Swagger API documentation - the /** */ markers are required for JSDoc to parse and generate docs, do not remove them
/**
 * @swagger
 * /api/gigs:
 *   get:
 *     summary: Get all gigs with optional filtering and pagination
 *     tags: [Gigs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Number of gigs per page
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title or venue
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [date, title, created_at]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of gigs with pagination metadata
 *       400:
 *         description: Invalid query parameters
 */
//function: documents the GET /api/gigs endpoint for Swagger UI
//why: allows users to see and test the public gigs listing with filters
//how: defines parameters for pagination/filtering and response schemas
router.get('/', [
  // TODO: Add validation for query parameters
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('genre').optional().isString().withMessage('Genre must be a string'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sort').optional().isIn(['date', 'title', 'created_at']).withMessage('Invalid sort option')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate query parameters
  // 2. Build WHERE clause for filtering
  // 3. Handle pagination
  // 4. Execute database query with JOIN to get user info
  // 5. Return formatted response with pagination metadata
  
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

// GET /api/gigs/:id - Get specific gig details (public)
/**
 * @swagger
 * /api/gigs/{id}:
 *   get:
 *     summary: Get details of a specific gig
 *     tags: [Gigs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Gig ID
 *     responses:
 *       200:
 *         description: Gig details
 *       400:
 *         description: Invalid gig ID
 *       404:
 *         description: Gig not found
 */
//function: documents the GET /api/gigs/{id} endpoint for Swagger UI
//why: allows users to view detailed information about a specific gig
//how: defines path parameter for ID and possible response codes
router.get('/:id', async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate ID parameter (must be positive integer)
  // 2. Execute database query with JOIN to get user info
  // 3. Check if gig exists
  // 4. Return gig details
  
  const gigId = req.params.id;
  
  // TODO: Add ID validation
  if (!gigId || isNaN(gigId)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid gig ID'
    });
  }

  // PLACEHOLDER - Add actual implementation
});

// GET /api/gigs/my - Get user's own gigs (private)
router.get('/my', authenticateToken, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Get user ID from token (req.user.id)
  // 2. Execute query to get all gigs for this user
  // 3. Support pagination like public endpoint
  // 4. Return user's gigs
  
  // PLACEHOLDER - Add actual implementation
});

// POST /api/gigs - Create new gig (private)
router.post('/', authenticateToken, gigValidation, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Check validation results
  // 2. Get user ID from token (req.user.id)
  // 3. Insert new gig into database
  // 4. Fetch the created gig (with user info)
  // 5. Return success response with created gig data
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  // PLACEHOLDER - Add actual implementation
});

// PUT /api/gigs/:id - Update gig (private)
router.put('/:id', authenticateToken, gigValidation, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate gig ID and request body
  // 2. Check if gig exists
  // 3. Verify user owns this gig (req.user.id === gig.user_id)
  // 4. Update gig in database
  // 5. Fetch updated gig and return
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const gigId = req.params.id;
  
  // TODO: Add ID validation and ownership check
  
  // PLACEHOLDER - Add actual implementation
});

// DELETE /api/gigs/:id - Delete gig (private)
router.delete('/:id', authenticateToken, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate gig ID
  // 2. Check if gig exists
  // 3. Verify user owns this gig (req.user.id === gig.user_id)
  // 4. Delete gig from database
  // 5. Return success message
  
  const gigId = req.params.id;
  
  // TODO: Add ID validation and ownership check
  
  // PLACEHOLDER - Add actual implementation
});

// Additional helper routes (optional):
// GET /api/gigs/featured - Get featured/popular gigs
// GET /api/gigs/upcoming - Get upcoming gigs (sorted by date)
// GET /api/gigs/:id/similar - Get similar gigs based on genre

module.exports = router;