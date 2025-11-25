/**
 * APPLICATION CONSTANTS
 * 
 * This file contains all application constants, API configurations, 
 * and configuration values for the Local Live Gigs application.
 * 
 * IMPLEMENTATION SECTIONS:
 * 
 * 1. API Configuration:
 *    - Base URL for backend API
 *    - API endpoint definitions
 *    - Timeout configurations
 * 
 * 2. Route Definitions:
 *    - Application route paths
 *    - Protected route definitions
 *    - Parameter route patterns
 * 
 * 3. Form Validation Rules:
 *    - Email validation patterns
 *    - Password requirements
 *    - Field length constraints
 * 
 * 4. UI Configuration:
 *    - Genre options for gigs
 *    - Venue type options
 *    - Status options
 *    - Theme configuration
 * 
 * 5. Application Settings:
 *    - Pagination defaults
 *    - File upload limits
 *    - Cache durations
 */

// API Configuration - TODO: Define API base URL and endpoints
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints - TODO: Define API endpoint patterns
/* export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  
  // Gigs
  GIGS: {
    LIST_ALL: '/gigs',
    LIST_MINE: '/gigs/my',
    DETAILS: (id) => `/gigs/${id}`,
    CREATE: '/gigs',
    UPDATE: (id) => `/gigs/${id}`,
    DELETE: (id) => `/gigs/${id}`
  },
  
  // Collections
  COLLECTIONS: {
    LIST_ALL: '/collections',
    LIST_MINE: '/collections/my',
    DETAILS: (id) => `/collections/${id}`,
    CREATE: '/collections',
    UPDATE: (id) => `/collections/${id}`,
    DELETE: (id) => `/collections/${id}`,
    ADD_GIG: (collectionId, gigId) => `/collections/${collectionId}/gigs/${gigId}`,
    REMOVE_GIG: (collectionId, gigId) => `/collections/${collectionId}/gigs/${gigId}`
  },
  
  // Users
  USERS: {
    LIST_ALL: '/users',
    DETAILS: (id) => `/users/${id}`,
    GIGS: (id) => `/users/${id}/gigs`,
    COLLECTIONS: (id) => `/users/${id}/collections`
  }
}; */

// Application Constants - TODO: Define application constants
/* export const CONSTANTS = {
  // Gig Categories/Genres
  GIG_GENRES: [
    'Rock', 'Pop', 'Jazz', 'Blues', 'Folk', 'Electronic',
    'Hip Hop', 'Country', 'Classical', 'Punk', 'Metal',
    'Indie', 'Alternative', 'Acoustic', 'Reggae', 'R&B',
    'Soul', 'Funk', 'World Music', 'Experimental'
  ],
  
  // Venue Types
  VENUE_TYPES: [
    'Club', 'Bar', 'Concert Hall', 'Outdoor', 'Festival',
    'Theater', 'Arena', 'Small Venue', 'Café', 'Warehouse'
  ],
  
  // User Roles
  USER_ROLES: {
    MEMBER: 'member',
    ADMIN: 'admin'
  },
  
  // App Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CANCELLED: 'cancelled',
    SOLD_OUT: 'sold_out'
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 50
  }
}; */

// Form Validation Rules - TODO: Define validation patterns
/* export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000
}; */

// Local Storage Keys - TODO: Define storage keys
/* export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  PREFERENCES: 'user_preferences'
}; */

// Routes - TODO: Define application routes
/* export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  GIGS: '/gigs',
  GIG_DETAILS: (id) => `/gigs/${id}`,
  MY_COLLECTIONS: '/my-collections',
  CREATE_GIG: '/gigs/create',
  EDIT_GIG: (id) => `/gigs/${id}/edit`,
  CREATE_COLLECTION: '/collections/create',
  EDIT_COLLECTION: (id) => `/collections/${id}/edit`,
  PROFILE: '/profile'
}; */

// Theme Configuration - TODO: Define theme settings
/* export const THEME = {
  COLORS: {
    PRIMARY: '#007bff',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40'
  },
  FONTS: {
    PRIMARY: "'Inter', sans-serif",
    SECONDARY: "'Roboto', sans-serif",
    MONO: "'Fira Code', monospace"
  },
  BREAKPOINTS: {
    XS: '320px',
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    XXL: '1536px'
  }
}; */

// File Upload Configuration - TODO: Define file upload settings
/* export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5242880, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  UPLOAD_PATH: '/uploads/'
}; */

// Cache Configuration - TODO: Define cache settings
/* export const CACHE = {
  USER_DATA: 24 * 60 * 60 * 1000, // 24 hours
  GIGS_LIST: 5 * 60 * 1000, // 5 minutes
  COLLECTIONS_LIST: 5 * 60 * 1000, // 5 minutes
  USER_PUBLIC_DATA: 60 * 60 * 1000 // 1 hour
}; */

// Error Messages - TODO: Define error messages
/* export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UPLOAD_ERROR: 'File upload failed. Please try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

// Success Messages - TODO: Define success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTER_SUCCESS: 'Account created successfully!',
  GIG_CREATED: 'Gig created successfully!',
  GIG_UPDATED: 'Gig updated successfully!',
  GIG_DELETED: 'Gig deleted successfully!',
  COLLECTION_CREATED: 'Collection created successfully!',
  COLLECTION_UPDATED: 'Collection updated successfully!',
  COLLECTION_DELETED: 'Collection deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
}; */

// Animation Durations - TODO: Define animation settings
/* export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EASE_TRANSITION: 'cubic-bezier(0.4, 0, 0.2, 1)'
}; */

// Social Media Links - TODO: Define social media platforms
/* export const SOCIAL_LINKS = {
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
  SPOTIFY: 'spotify',
  BANDCAMP: 'bandcamp',
  SOUNDCLOUD: 'soundcloud'
}; */

// Date Format Patterns - TODO: Define date formatting
/* export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'MMM DD, YYYY HH:mm',
  RELATIVE: 'relative'
}; */

// Export all constants as default
export default {
  // TODO: Export all defined constants
  // API_BASE_URL,
  // API_ENDPOINTS,
  // CONSTANTS,
  // VALIDATION,
  // STORAGE_KEYS,
  // ROUTES,
  // THEME,
  // FILE_UPLOAD,
  // CACHE,
  // ERROR_MESSAGES,
  // SUCCESS_MESSAGES,
  // ANIMATION,
  // SOCIAL_LINKS,
  // DATE_FORMATS
};