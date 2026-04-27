import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import puter from '@heyputer/puter.js';
import * as admin from 'firebase-admin';

dotenv.config();

// Set the Puter token from environment variables
if (process.env.PUTER_API_KEY) {
  puter.setToken(process.env.PUTER_API_KEY);
  console.log('Puter token set');
}

// Initialize Firebase Admin (requires serviceAccountKey.json in backend folder)
// If not provided, it will log a warning and skip verification
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Looks for GOOGLE_APPLICATION_CREDENTIALS
  });
  console.log('Firebase Admin initialized');
} catch (error) {
  console.warn('Firebase Admin could not be initialized. Auth verification will be skipped.');
}

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify Google ID Token from Frontend
const verifyUser = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Skip if no token, for demo purposes
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/chat', verifyUser, async (req: any, res: any) => {
  const { message, language } = req.body;
  const userName = req.user?.name || 'User';

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Calling Puter AI on backend using the PUTER_API_KEY from .env
    const aiResponse = await puter.ai.chat(
      `You are Sukoon AI, an empathetic mental health assistant. 
       The user's name is ${userName}. 
       Respond in ${language || 'English'}.
       User says: ${message}`,
      { model: 'gemini-3.1-flash-lite-preview' }
    );
    
    // Puter returns a message object with a content field
    const reply = aiResponse?.message?.content || "I'm here to support you. Could you tell me more?";
    
    res.json({
      reply: reply,
      quickReplies: ["Tell me more", "I feel heard", "What can I do next?"]
    });
  } catch (err: any) {
    console.error('Puter AI error:', err);
    res.status(500).json({ error: 'AI Connection Issue', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
