# Sukoon Mental Wellness App

A premium, production-level minimal mobile app for mental wellness built with React Native (Expo).

## Features
*   **Design:** Apple-level minimalism, using the "Luminous Breath" design system. Soft Mint Green (#6EE7B7) and Pure White (#FFFFFF).
*   **Screens:** Splash, Language Selection, Google Login, Chat (WhatsApp-style), Mood Tracker, Therapist Booking.
*   **Frontend:** React Native (Expo), TypeScript, React Navigation, Tailwind CSS setup.
*   **Backend integration:** Designed to interact with a Node.js/Supabase Edge Function backend. 
*   **AI:** Uses Puter.js (Gemini AI) securely on the backend (`POST /chat`) to provide empathetic, context-aware responses and quick replies.
*   **Database:** Supabase schema included for `users`, `chats`, `therapists`, `bookings`, `mood_logs`.

## Running the App
1. Install dependencies: `npm install`
2. Start Expo server: `npx expo start`
3. Run on iOS, Android simulator, or via Expo Go app on your physical device.

## Backend Architecture
- The frontend sends messages via the `POST /chat` API route.
- The backend API (Node.js/Edge Function) is the **only** place where `puter.ai.chat()` runs. The Puter token is never exposed to the frontend.
- See `src/backend/api.ts` for the mock implementation.
- See `src/backend/supabaseSchema.sql` for the database schema.
