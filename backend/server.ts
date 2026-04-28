import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
dotenv.config();

// Initialize Puter with the Auth Token
let puter = require('@heyputer/puter.js');
// Handle ESM default export if it exists
if (puter.default) {
  puter = puter.default;
}

console.log('Puter object keys:', Object.keys(puter));

const token = process.env.PUTER_AUTH_TOKEN;

if (token) {
  try {
    if (typeof puter.setToken === 'function') {
      puter.setToken(token);
      console.log('Puter: setToken used.');
    } else {
      // Try setting on ai if it exists
      if (puter.ai) {
        if (typeof puter.ai.setToken === 'function') {
          puter.ai.setToken(token);
        } else {
          (puter.ai as any).authToken = token;
        }
      }
      (puter as any).authToken = token;
      console.log('Puter: Property assignment used.');
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

app.get('/ai-bridge', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://js.puter.com/v2/"></script>
        <script>
            console.log('Puter Bridge Initializing...');
            
            // Listen for messages from React Native
            window.addEventListener('message', async (event) => {
                let data;
                try {
                    data = JSON.parse(event.data);
                } catch (e) {
                    console.error('Failed to parse message:', event.data);
                    return;
                }

                const { type, message, userName, language, model } = data;
                
                if (type === 'CHAT_REQUEST') {
                    try {
                        const response = await puter.ai.chat(
                            \`You are Sukoon AI, an empathetic mental health assistant. 
                             The user's name is \${userName}. 
                             Respond in \${language || 'English'}.
                             User says: \${message}\`,
                            { model: model || 'gemini-3.1-flash-lite-preview' }
                        );
                        
                        const reply = response?.message?.content || response?.text || "I'm here to support you.";
                        
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'CHAT_RESPONSE',
                            reply: reply
                        }));
                    } catch (err) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'CHAT_ERROR',
                            error: err.message || 'Unknown error'
                        }));
                    }
                }
            });
            
            // Periodically check if bridge is ready
            const checkReady = setInterval(() => {
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'BRIDGE_READY' }));
                    clearInterval(checkReady);
                }
            }, 500);
        </script>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f0f0; }
            #status { padding: 20px; border-radius: 10px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        </style>
    </head>
    <body>
        <div id="status">Sukoon AI Bridge Active</div>
    </body>
    </html>
  `);
});

app.post('/chat', verifyUser, async (req: any, res: any) => {
  const { message, language } = req.body;
  const userName = req.user?.name || 'User';

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Calling Puter AI
    const aiResponse = await puter.ai.chat(
      `You are Sukoon AI, an empathetic mental health assistant. 
       The user's name is ${userName}. 
       Respond in ${language || 'English'}.
       User says: ${message}`,
      { model: 'grok-4-1-fast' }
    );
    
    // Puter returns a message object with a content field
    const reply = (aiResponse as any)?.message?.content || (aiResponse as any)?.text || "I'm here to support you. Could you tell me more?";
    
    res.json({
      reply: reply,
      quickReplies: ["Tell me more", "I feel heard", "What can I do next?"]
    });
  } catch (err: any) {
    console.error('PUTER ERROR MESSAGE:', err.message);
    console.error('PUTER ERROR DETAILS:', err.response?.data || err);
    res.status(500).json({ error: 'AI Connection Issue', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
