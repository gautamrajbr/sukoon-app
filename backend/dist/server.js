"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const puter_js_1 = __importDefault(require("@heyputer/puter.js"));
const admin = __importStar(require("firebase-admin"));
dotenv_1.default.config();
// Initialize Firebase Admin (requires serviceAccountKey.json in backend folder)
// If not provided, it will log a warning and skip verification
try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Looks for GOOGLE_APPLICATION_CREDENTIALS
    });
    console.log('Firebase Admin initialized');
}
catch (error) {
    console.warn('Firebase Admin could not be initialized. Auth verification will be skipped.');
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware to verify Google ID Token from Frontend
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(); // Skip if no token, for demo purposes
    }
    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
});
app.post('/chat', verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { message, language } = req.body;
    const userName = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.name) || 'User';
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        // Calling Puter AI on backend using the PUTER_API_KEY from .env
        const aiResponse = yield puter_js_1.default.ai.chat(`You are Sukoon AI, an empathetic mental health assistant. 
       The user's name is ${userName}. 
       Respond in ${language || 'English'}.
       User says: ${message}`, { model: 'gemini-3.1-flash-lite-preview' });
        // Puter returns a message object with a content field
        const reply = ((_b = aiResponse === null || aiResponse === void 0 ? void 0 : aiResponse.message) === null || _b === void 0 ? void 0 : _b.content) || "I'm here to support you. Could you tell me more?";
        res.json({
            reply: reply,
            quickReplies: ["Tell me more", "I feel heard", "What can I do next?"]
        });
    }
    catch (err) {
        console.error('Puter AI error:', err);
        res.status(500).json({ error: 'AI Connection Issue', details: err.message });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
