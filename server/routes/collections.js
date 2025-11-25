/**
 * COLLECTIONS ROUTES - Collection Management Endpoints
 * 
 * This file contains all collection-related routes:
 * - Browse all collections (public)
 * - View specific collection details
 * - User's collections (private)
 * - Create new collection (private)
 * - Update collection (private)
 * - Delete collection (private)
 * - Add gig to collection (private)
 * - Remove gig from collection (private)
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DATABASE SCHEMA:
 *    collections table: id, name, description, user_id, is_public, created_at, updated_at
 *    collection_gigs table: collection_id, gig_id, added_at (many-to-many junction table)
 * 
 * 2. BUSINESS LOGIC:
 *    - Collections can be public or private
 *    - Users can only modify their own collections
 *    - Any user can view public collections
 *    - Only collection owner can view private collections
 *    - When deleting a collection, remove all associated collection_gigs entries
 *    - Prevent duplicate gig additions to same collection
 * 
 * 3. VALIDATION RULES:
 *    - name: required, 2-100 characters, unique per user
 *    - description: optional, max 500 characters
 *    - is_public: boolean, default false
 * 
 * 4. SPECIAL FEATURES:
 *    - Collection sharing via URL (for public collections)
 *    - Collection stats (number of gigs, last updated)
 *    - Bulk operations (add multiple gigs, remove multiple gigs)
 */

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for collection creation/update
// TODO: Create validation rules for collections
const collectionValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Collection name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('is_public')
    .optional()
    .isBoolean()
    .withMessage('is_public must be a boolean value')
];

// GET /api/collections - Get all public collections (public)
router.get('/', [
  // TODO: Add validation for query parameters
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('user_id').optional().isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
  query('sort').optional().isIn(['name', 'created_at', 'updated_at']).withMessage('Invalid sort option')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate query parameters
  // 2. Only return public collections
  // 3. Join with users table to get creator info
  // 4. Include gig count for each collection
  // 5. Handle pagination
  
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

// GET /api/collections/my - Get user's collections (private)
router.get('/my', authenticateToken, [
  // TODO: Add validation for query parameters
  query('include_private').optional().isBoolean().withMessage('include_private must be boolean'),
  query('include_public').optional().isBoolean().withMessage('include_public must be boolean')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Get user ID from token (req.user.id)
  // 2. Return both public and private collections for this user
  // 3. Include gig counts and last updated dates
  // 4. Support filtering by visibility
  
  // PLACEHOLDER - Add actual implementation
});

// GET /api/collections/:id - Get specific collection details
router.get('/:id', [
  // TODO: Add validation for collection ID
  param('id').isInt({ min: 1 }).withMessage('Invalid collection ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate collection ID
  // 2. Check if collection exists and is public OR user owns it
  // 3. Join with collection_gigs to get all gigs in collection
  // 4. Join with gigs table to get full gig details
  // 5. Include collection stats
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Invalid collection ID',
      details: errors.array()
    });
  }

  const collectionId = req.params.id;

  // PLACEHOLDER - Add actual implementation
});

// POST /api/collections - Create new collection (private)
router.post('/', authenticateToken, collectionValidation, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Check validation results
  // 2. Get user ID from token (req.user.id)
  // 3. Check if collection name is unique for this user
  // 4. Insert new collection into database
  // 5. Fetch created collection with user info
  
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

// PUT /api/collections/:id - Update collection (private)
router.put('/:id', authenticateToken, collectionValidation, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate collection ID and request body
  // 2. Check if collection exists
  // 3. Verify user owns this collection (req.user.id === collection.user_id)
  // 4. If changing name, check uniqueness for this user
  // 5. Update collection in database
  // 6. Fetch updated collection and return
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const collectionId = req.params.id;
  
  // TODO: Add ID validation and ownership check
  
  // PLACEHOLDER - Add actual implementation
});

// DELETE /api/collections/:id - Delete collection (private)
router.delete('/:id', authenticateToken, async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate collection ID
  // 2. Check if collection exists
  // 3. Verify user owns this collection
  // 4. Delete all collection_gigs entries for this collection
  // 5. Delete collection from database
  // 6. Return success message
  
  const collectionId = req.params.id;
  
  // TODO: Add ID validation and ownership check
  
  // PLACEHOLDER - Add actual implementation
});

// POST /api/collections/:id/gigs/:gigId - Add gig to collection (private)
router.post('/:id/gigs/:gigId', authenticateToken, [
  // TODO: Add validation for both IDs
  param('id').isInt({ min: 1 }).withMessage('Invalid collection ID'),
  param('gigId').isInt({ min: 1 }).withMessage('Invalid gig ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate collection and gig IDs
  // 2. Verify user owns the collection
  // 3. Check if gig exists
  // 4. Check if gig is not already in collection (prevent duplicates)
  // 5. Add entry to collection_gigs table
  // 6. Return updated collection stats
  
  const { id: collectionId, gigId } = req.params;
  
  // PLACEHOLDER - Add actual implementation
});

// DELETE /api/collections/:id/gigs/:gigId - Remove gig from collection (private)
router.delete('/:id/gigs/:gigId', authenticateToken, [
  // TODO: Add validation for both IDs
  param('id').isInt({ min: 1 }).withMessage('Invalid collection ID'),
  param('gigId').isInt({ min: 1 }).withMessage('Invalid gig ID')
], async (req, res) => {
  // TODO: Implementation steps:
  // 1. Validate collection and gig IDs
  // 2. Verify user owns the collection
  // 3. Check if the gig exists in this collection
  // 4. Remove entry from collection_gigs table
  // 5. Return updated collection stats
  
  const { id: collectionId, gigId } = req.params;
  
  // PLACEHOLDER - Add actual implementation
});

// Additional helper routes (optional):
// POST /api/collections/:id/gigs/bulk - Add multiple gigs to collection
// DELETE /api/collections/:id/gigs/bulk - Remove multiple gigs from collection
// GET /api/collections/:id/stats - Get collection statistics
// POST /api/collections/:id/duplicate - Duplicate a collection

module.exports = router;