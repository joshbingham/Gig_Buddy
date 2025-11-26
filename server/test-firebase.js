import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Test connection by reading a simple Firestore collection
async function testConnection() {
  try {
    // Try to get a document (or create a test one)
    const docRef = db.collection('test-connection').doc('ping');
    await docRef.set({ timestamp: admin.firestore.FieldValue.serverTimestamp() });
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      console.log('✅ Firestore connection successful!');
      console.log('Document data:', docSnap.data());
    } else {
      console.log('⚠️ Document not found. Firestore connected but doc missing.');
    }
  } catch (error) {
    console.error('❌ Firestore connection failed:', error.message);
  }
}

testConnection();