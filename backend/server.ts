import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
dotenv.config();

// Initialize Puter with the Auth Token
const puter = require('@heyputer/puter.js');
if (process.env.PUTER_AUTH_TOKEN) {
  try {
    // Some versions use .setToken on the instance
    if (typeof puter.setToken === 'function') {
      puter.setToken(process.env.PUTER_AUTH_TOKEN);
    } else {
      // Direct assignment if allowed, or skip if it's already set via env
      console.log('Puter: Attempting to use environment variable PUTER_AUTH_TOKEN automatically.');
    }
  } catch (e: any) {
    console.warn('Puter token setup warning:', e.message);
  }
}

// Initialize Firebase Admin (Only if credentials are provided)
const firebaseConfigured = process.env.FIREBASE_PROJECT_ID ? true : false;
if (firebaseConfigured) {
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin initialized with Project ID:', process.env.FIREBASE_PROJECT_ID);
  } catch (error) {
    console.warn('Firebase Admin init failed:', error);
  }
} else {
  console.log('Firebase Admin not configured. Running in open mode.');
}

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify Google ID Token from Frontend
const verifyUser = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ') && admin.apps.length > 0) {
    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    } catch (error: any) {
      console.error('Token verification failed, but continuing:', error.message);
    }
  }
  next();
};

app.post('/chat', verifyUser, async (req: any, res: any) => {
  const { message, language } = req.body;
  const userName = req.user?.name || 'User';

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Calling Puter AI on backend using the PUTER_AUTH_TOKEN from .env
    console.log('Sending message to Puter AI...');
    const aiResponse = await puter.ai.chat(
      `You are Sukoon AI, an empathetic mental health assistant. 
       The user's name is ${userName}. 
       Respond in ${language || 'English'}.
       User says: ${message}`,
      { model: 'gemini-3.1-flash-lite-preview' }
    );
    
    console.log('RAW PUTER RESPONSE:', JSON.stringify(aiResponse, null, 2));
    
    // Puter returns a message object with a content field
    const reply = (aiResponse as any)?.message?.content || (aiResponse as any)?.text || "I'm here to support you. Could you tell me more?";
    
    res.json({
      reply: reply,
      quickReplies: ["Tell me more", "I feel heard", "What can I do next?"]
    });
  } catch (err: any) {
    console.error('FULL PUTER ERROR:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'AI Connection Issue', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
