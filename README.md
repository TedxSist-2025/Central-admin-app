# TEDxSIST Central-Admin-App

## Getting Started

To set up and run the development server, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.  
   Alternatively, you can use your IP address (IPv4) to test on other devices.

---

**Important Security Note:** 
The Flask-based REST API (cert_gen) requires proper security measures:
- Implement authentication to prevent unauthorized access
- Add rate limiting to prevent abuse
- Use HTTPS in production
- Consider adding API keys or tokens
- Validate all inputs to prevent injection attacks

## Connect with Firebase

Set up your Firebase environment by creating a `.env.local` file in the root directory and adding the following configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
NEXT_PUBLIC_TEMP_DIR=./public/TEMP
```

Replace the placeholders (`<your-firebase-...>`) with your actual Firebase project configuration values.

---

## To-Do List

### 1. Bulk Email and Certificate Management

- send bulk emails to participants.
- Save certificates in the target Google Drive

### 2. Scalability

- Optimize the app to reduce unnecessary reads and writes to the Firebase database.

### 3. Security Enhancements

- Use **HTTP-only cookies** for session management instead of saving tokens in local or session storage, if necessary.

### 4. Firebase Security Rules

Update the Firestore security rules to ensure data protection. Use the following rules to restrict access:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Match all documents in the database
    match /{document=**} {
      // Allow read access only for authenticated users
      allow read: if request.auth != null;

      // Allow write access only if the user is an admin
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

**Note:** These security rules are not currently implemented and will be added in future updates.

---

**Note:** I have added flask based restapi, because javascript ain't generating certs properly.. (cert_gen) 

© TEDxSIST @tech_team
