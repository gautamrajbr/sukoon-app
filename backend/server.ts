import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import puter from '@heyputer/puter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, language } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Calling Puter AI locally on backend
    const aiResponse = await puter.ai.chat(
      `Respond empathetically to this user. They are using language: ${language || 'en'}. Message: ${message}`,
      { model: 'gemini-3.1-flash-lite-preview' }
    );
    
    res.json({
      reply: aiResponse?.message?.content || "I hear you.",
      quickReplies: ["Tell me more", "I feel better", "Need support"]
    });
  } catch (err: any) {
    console.error('Puter AI error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
