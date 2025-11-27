# Firebase Setup Guide

## Credentials Extraction from Service Account JSON

Open your downloaded `serviceAccountKey.json` file and extract these values:

### For server/.env file:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREACT_CLIENT_ID=123456789
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com
```

### For .env file (frontend):
```
REACT_APP_FIREBASE_API_KEY=your-web-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Firebase Console Links

- **Project Dashboard**: https://console.firebase.google.com/project/YOUR_PROJECT_ID
- **Firestore Database**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore
- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication
- **Service Accounts**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/serviceaccounts

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit the service account JSON file to Git
- Never expose private keys in client-side code
- Use environment variables for all sensitive data
- Enable authentication rules in Firestore for production