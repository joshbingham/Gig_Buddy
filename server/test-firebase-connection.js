require('dotenv').config();

async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
    
    // Import the Firebase configuration
    const { testConnection, createDocument, getDocuments } = require('./config/database-firebase');
    
    // Test connection
    const connected = await testConnection();
    
    if (connected) {
      console.log('✅ Firebase connection successful!');
      
      // Test basic operations
      try {
        // Create a test document
        const testDoc = await createDocument('test_collection', null, {
          message: 'Firebase connection test',
          timestamp: new Date(),
          status: 'active'
        });
        console.log('✅ Test document created:', testDoc);
        
        // Query test documents
        const documents = await getDocuments('test_collection', [
          { field: 'status', operator: '==', value: 'active' }
        ]);
        console.log('✅ Query test successful. Found documents:', documents.length);
        
      } catch (opError) {
        console.log('⚠️ Connection works, but test operations failed:', opError.message);
      }
      
    } else {
      console.log('❌ Firebase connection failed!');
    }
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error.message);
    console.error('Error details:', error);
  }
}

// Run the test
testFirebaseConnection();