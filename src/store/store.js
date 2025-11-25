/**
 * REDUX STORE CONFIGURATION
 * 
 * This file configures the Redux store with all necessary reducers and middleware.
 * 
 * IMPLEMENTATION REQUIREMENTS:
 * 
 * 1. REDUCERS TO CREATE:
 *    - auth: User authentication state (token, user info, loading, errors)
 *    - gigs: Gig data (list, individual gig, filters, pagination)
 *    - collections: Collection data (list, individual collection, filters)
 *    - users: User profile data and public user information
 *    - ui: UI state (notifications, modals, loading, theme)
 * 
 * 2. STATE STRUCTURE:
 *    - auth: { user, token, isAuthenticated, isLoading, error }
 *    - gigs: { list, currentGig, filters, pagination, isLoading, error }
 *    - collections: { list, currentCollection, filters, pagination, isLoading, error }
 *    - users: { currentUser, publicUsers, isLoading, error }
 *    - ui: { notifications, modals, theme, sidebarOpen }
 * 
 * 3. MIDDLEWARE:
 *    - redux-thunk for async actions
 *    - redux-devtools-extension for development
 *    - redux-persist for localStorage (optional)
 *    - Custom middleware for API error handling
 * 
 * 4. REDUX PATTERN:
 *    - Action types as constants
 *    - Action creators as functions
 *    - Async action creators using redux-thunk
 *    - Normalized state structure for better performance
 * 
 * 5. SLICE STRUCTURE:
 *    Each slice should export:
 *    - Initial state
 *    - Action creators (sync and async)
 *    - Reducer function
 *    - Selectors
 * 
 * 6. PERSISTENCE:
 *    - Auth state persistence (token, user info)
 *    - UI preferences (theme, sidebar state)
 *    - Exclude sensitive data from persistence
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers (to be created with detailed comments)
// TODO: Import all reducers with detailed comments
// import authReducer from './slices/authSlice';
// import gigsReducer from './slices/gigsSlice';
// import collectionsReducer from './slices/collectionsSlice';
// import usersReducer from './slices/usersSlice';
// import uiReducer from './slices/uiSlice';

// Import middleware (to be created)
// TODO: Import custom middleware
// import { apiMiddleware } from './middleware/apiMiddleware';

// Redux persist configuration
const persistConfig = {
  key: 'local-live-gigs',
  storage,
  whitelist: ['auth', 'ui'], // Only persist auth and UI state
  blacklist: ['gigs', 'collections', 'users'] // Don't persist data that can be refetched
};

// Root reducer - combine all reducers
const rootReducer = combineReducers({
  // TODO: Add all reducers
  auth: authReducer || (state => state),
  gigs: gigsReducer || (state => state),
  collections: collectionsReducer || (state => state),
  users: usersReducer || (state => state),
  ui: uiReducer || (state => state)
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  
  // Middleware configuration
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    });
    // TODO: Add custom middleware
    // .concat(apiMiddleware);
  },
  
  // Development tools
  devTools: process.env.NODE_ENV !== 'production'
});

// Create persistor
export const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };

// Export types for use in components (use in TypeScript files)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Export selectors for convenient access
// TODO: Create and export selectors for each slice
// export const selectAuth = (state) => state.auth;
// export const selectGigs = (state) => state.gigs;
// export const selectCollections = (state) => state.collections;
// export const selectUsers = (state) => state.users;
// export const selectUI = (state) => state.ui;

// Placeholder reducers (to be replaced with actual implementations)
// TODO: Remove these and create proper reducers
const authReducer = (state = { user: null, token: null, isAuthenticated: false, isLoading: false, error: null }) => state;
const gigsReducer = (state = { list: [], currentGig: null, filters: {}, pagination: {}, isLoading: false, error: null }) => state;
const collectionsReducer = (state = { list: [], currentCollection: null, filters: {}, pagination: {}, isLoading: false, error: null }) => state;
const usersReducer = (state = { currentUser: null, publicUsers: [], isLoading: false, error: null }) => state;
const uiReducer = (state = { notifications: [], modals: [], theme: 'light', sidebarOpen: false }) => state;