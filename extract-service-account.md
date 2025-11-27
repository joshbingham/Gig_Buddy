# Extract Service Account Values

## From the downloaded JSON file, add these to `server/.env`:

```
# Firebase Service Account Configuration
FIREBASE_PROJECT_ID=gig-buddy-86ea6
FIREBASE_PRIVATE_KEY_ID=[value from "private_key_id"]
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[value from "private_key" - replace \n with actual newlines]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@gig-buddy-86ea6.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=[value from "client_id"]
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40gig-buddy-86ea6.iam.gserviceaccount.com
```

## Example server/.env structure:
```
# Keep your existing DATABASE_URL for now (we'll switch to Firebase)
DATABASE_URL=postgresql://postgres:password@db.example.com:5432/postgres

# Add Firebase service account
FIREBASE_PROJECT_ID=gig-buddy-86ea6
FIREBASE_PRIVATE_KEY_ID=abcd1234...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@gig-buddy-86ea6.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789...
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-abc123%40gig-buddy-86ea6.iam.gserviceaccount.com