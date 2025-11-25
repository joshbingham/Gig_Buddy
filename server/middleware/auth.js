/**
 * AUTHENTICATION MIDDLEWARE
 * 
 * This middleware handles JWT token authentication for protected routes.
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. DEPENDENCIES TO USE:
 *    - jsonwebtoken for token verification
 * 
 * 2. SECURITY FEATURES:
 *    - Verify JWT token from Authorization header
 *    - Support Bearer token format (Authorization: Bearer <token>)
 *    - Handle token expiration
 *    - Handle malformed tokens
 *    - Extract user information from token
 * 
 * 3. TOKEN FORMAT:
 *    The JWT token should contain:
 *    - user.id (user ID)
 *    - user.email (user email)
 *    - user.role (user role for authorization)
 *    - iat (issued at timestamp)
 *    - exp (expiration timestamp)
 * 
 * 4. ERROR HANDLING:
 *    - 401: No token provided
 *    - 403: Invalid/expired token
 *    - Include appropriate error messages
 * 
 * 5. TOKEN GENERATION:
 *    When generating tokens, include:
 *    - User ID for database queries
 *    - User email for profile updates
 *    - User role for authorization checks
 *    - 24 hour expiration time
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
      code: 'TOKEN_REQUIRED'
    });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Handle different types of token errors
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({
          success: false,
          error: 'Token has expired',
          code: 'TOKEN_EXPIRED'
        });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          success: false,
          error: 'Invalid token format',
          code: 'TOKEN_INVALID'
        });
      } else {
        return res.status(403).json({
          success: false,
          error: 'Token verification failed',
          code: 'TOKEN_VERIFICATION_FAILED'
        });
      }
    }

    // Token is valid, attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  });
};

/**
 * Middleware to check if user is admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin privileges required',
      code: 'ADMIN_REQUIRED'
    });
  }

  next();
};

/**
 * Middleware to check if user owns the resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} userIdField - The field name in the resource that contains the user ID
 */
const requireOwnership = (userIdField = 'user_id') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    const resourceUserId = req.body[userIdField] || req.params[userIdField];
    
    if (resourceUserId && parseInt(resourceUserId) !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'You can only modify your own resources',
        code: 'OWNERSHIP_REQUIRED'
      });
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Allows requests with or without valid tokens
 * If token is provided and valid, sets req.user
 * If token is invalid/missing, continues without user
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
    }
    next();
  });
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireOwnership,
  optionalAuth
};