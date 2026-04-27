# Sukoon - Mental Wellness App

A React Native mental wellness application using a premium, calm design system, Firebase Auth, Supabase backend, and Gemini AI via Puter.js on a dedicated backend.

## Architecture
- **Frontend**: React Native (Expo) app located in `/sukoon`
  - Utilizes React Navigation
  - State management via Zustand
  - Design system using specific calm colors (Mint Green, Light Blue, White, Dark Gray)
- **Backend**: Express node server located in `/backend`
  - Serves `POST /chat`
  - Secures the Puter.js Gemini AI integration on the server side

## Setup Instructions

1. Start Backend:
   ```bash
   cd backend
   npm install
   npm run build
   node dist/server.js
   ```

2. Start Frontend:
   ```bash
   cd sukoon
   npm install
   npx expo start
   ```

## Note on External Integrations
- Due to the constrained environment, Firebase Google Sign-In is mocked with email/password flow but using the real `firebase/auth` SDK.
- Supabase is configured with a dummy URL/Key in `sukoon/src/backend/api.ts`.
- The database schema required is present in `sukoon/src/backend/supabaseSchema.sql`.
