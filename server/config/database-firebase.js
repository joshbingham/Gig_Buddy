const admin = require('firebase-admin');
require('dotenv').config();

/**
 * FIREBASE CONFIGURATION
 * 
 * This file handles Firebase/Firestore database connection and configuration.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create Firebase project at https://console.firebase.google.com
 * 2. Enable Firestore Database
 * 3. Generate Service Account Key (JSON)
 * 4. Add environment variables from the service account
 * 
 * ENVIRONMENT VARIABLES NEEDED:
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_PRIVATE_KEY_ID  
 * - FIREBASE_PRIVATE_KEY (with \n escaped)
 * - FIREBASE_CLIENT_EMAIL
 * - FIREBASE_CLIENT_ID
 * - FIREBASE_CLIENT_X509_CERT_URL
 */

// Firebase Admin SDK initialization
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Test Firebase connection
 * @returns {Promise<boolean>} - True if connection successful
 */
const testConnection = async () => {
  try {
    // Test connection by listing collections (metadata read)
    const collections = await db.listCollections();
    console.log('Firebase connected successfully! Collections found:', collections.length);
    return true;
  } catch (error) {
    console.error('Firebase connection failed:', error.message);
    return false;
  }
};

/**
 * Create a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID (optional)
 * @param {Object} data - Document data
 * @returns {Promise<string>} - Document ID
 */
const createDocument = async (collection, docId, data) => {
  try {
    if (docId) {
      await db.collection(collection).doc(docId).set(data);
      return docId;
    } else {
      const docRef = await db.collection(collection).add(data);
      return docRef.id;
    }
  } catch (error) {
    console.error('Create document error:', error);
    throw error;
  }
};

/**
 * Get a document by ID
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<Object|null>} - Document data or null
 */
const getDocument = async (collection, docId) => {
  try {
    const doc = await db.collection(collection).doc(docId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Get document error:', error);
    throw error;
  }
};

/**
 * Update a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
const updateDocument = async (collection, docId, data) => {
  try {
    await db.collection(collection).doc(docId).update(data);
  } catch (error) {
    console.error('Update document error:', error);
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<void>}
 */
const deleteDocument = async (collection, docId) => {
  try {
    await db.collection(collection).doc(docId).delete();
  } catch (error) {
    console.error('Delete document error:', error);
    throw error;
  }
};

/**
 * Get multiple documents with query
 * @param {string} collection - Collection name
 * @param {Array} conditions - Query conditions [{ field, operator, value }]
 * @param {Object} options - Query options { limit, orderBy, startAfter }
 * @returns {Promise<Array>} - Array of documents
 */
const getDocuments = async (collection, conditions = [], options = {}) => {
  try {
    let query = db.collection(collection);

    // Apply conditions
    conditions.forEach(condition => {
      query = query.where(condition.field, condition.operator, condition.value);
    });

    // Apply ordering
    if (options.orderBy) {
      query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.startAfter) {
      query = query.startAfter(options.startAfter);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get documents error:', error);
    throw error;
  }
};

/**
 * Get collection count
 * @param {string} collection - Collection name
 * @param {Array} conditions - Query conditions
 * @returns {Promise<number>} - Document count
 */
const getDocumentCount = async (collection, conditions = []) => {
  try {
    let query = db.collection(collection);
    
    conditions.forEach(condition => {
      query = query.where(condition.field, condition.operator, condition.value);
    });

    const snapshot = await query.get();
    return snapshot.size;
  } catch (error) {
    console.error('Count documents error:', error);
    throw error;
  }
};

/**
 * Batch write operation
 * @param {Array} operations - Array of { type: 'create'|'update'|'delete', collection, docId, data }
 * @returns {Promise<void>}
 */
const batchWrite = async (operations) => {
  try {
    const batch = db.batch();
    
    operations.forEach(op => {
      const ref = db.collection(op.collection).doc(op.docId);
      
      switch (op.type) {
        case 'create':
          batch.set(ref, op.data);
          break;
        case 'update':
          batch.update(ref, op.data);
          break;
        case 'delete':
          batch.delete(ref);
          break;
      }
    });

    await batch.commit();
  } catch (error) {
    console.error('Batch write error:', error);
    throw error;
  }
};

/**
 * Real-time listener
 * @param {string} collection - Collection name
 * @param {Array} conditions - Query conditions
 * @param {Function} callback - Callback function for updates
 * @returns {Function} - Unsubscribe function
 */
const listenToCollection = (collection, conditions = [], callback) => {
  let query = db.collection(collection);

  conditions.forEach(condition => {
    query = query.where(condition.field, condition.operator, condition.value);
  });

  const unsubscribe = query.onSnapshot(
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    },
    (error) => {
      console.error('Real-time listener error:', error);
    }
  );

  return unsubscribe;
};

module.exports = {
  db,
  admin,
  testConnection,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  getDocumentCount,
  batchWrite,
  listenToCollection
};