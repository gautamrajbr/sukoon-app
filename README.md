# Sukoon - Mental Wellness App

A React Native mental wellness application using a premium, calm design system, Firebase Auth, Supabase backend, and Gemini AI via Puter.js on a dedicated backend.

## GitHub Repository
You can clone the repository from here:
```bash
git clone https://github.com/gautamrajbr/sukoon-app.git
```

## Setup Instructions

### 1. Run the Frontend (Expo app)
The backend is already deployed to Render and wired up! To run the React Native app:

```bash
cd sukoon-app/sukoon
npm install
npx expo start
```
Then scan the QR code with the Expo Go app on your phone, or press `i` to open in iOS simulator, or `a` for Android emulator.

### 2. Note on Backend
The backend Express app is deployed to:
`https://sukoon-backend-tzxw.onrender.com`

*Note: Render free tier spins down after 15 minutes of inactivity, so the first chat message you send might take ~50 seconds to respond as the server spins back up.*

### 3. Note on External Integrations
- Due to the constrained environment, Firebase Google Sign-In is mocked with email/password flow but using the real `firebase/auth` SDK.
- Supabase is configured with a dummy URL/Key in `sukoon/src/backend/api.ts`.
- The database schema required is present in `sukoon/src/backend/supabaseSchema.sql`.
trigger
