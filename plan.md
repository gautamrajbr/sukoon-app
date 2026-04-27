1. **Design Complete:** The UI/UX design via Stitch MCP has been completed.
2. **Setup Frontend:**
    - I've initialized an Expo React Native app in the `sukoon` directory using `npx create-expo-app`.
    - I will set up routing with `expo-router` (or `react-navigation` as requested).
    - I've installed required dependencies (`tailwindcss`, `zustand`, `@react-navigation/native`, `@supabase/supabase-js`, `firebase`, etc.).
    - Configure Tailwind CSS.
3. **Build UI Screens:** I will create the necessary React Native components:
    - Splash Screen
    - Language Selection
    - Google Login
    - Chat Screen
    - Therapist Booking
    - Mood Check
4. **Setup Firebase:**
    - Setup Firebase config (I will use environment variables or mock configs if real ones aren't provided by user).
    - Implement Google Sign-in flow.
5. **Setup Supabase:**
    - Initialize Supabase client.
    - Create SQL schema (users, chats, therapists, bookings, mood_logs) and provide it as part of the output or create them via API.
6. **Integrate Puter.js:**
    - The instructions explicitly mention "Puter must run ONLY in backend". So I will create a Node.js/Express or Supabase Edge function for the backend API (`POST /chat`) that uses Puter.js (Gemini AI).
    - The API will receive the message and language, call Puter.ai, and return the response.
7. **Connect Frontend to Backend:**
    - Wire up the chat screen to send requests to the backend API.
    - Handle state management using Zustand.
8. **Final Review & Pre-commit:**
    - Ensure all code is working and meets the "minimal, no-friction" requirements.
    - Run pre-commit instructions.
