"use strict";
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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message, language } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        // Calling Puter AI locally on backend
        const aiResponse = yield puter_js_1.default.ai.chat(`Respond empathetically to this user. They are using language: ${language || 'en'}. Message: ${message}`, { model: 'gemini-3.1-flash-lite-preview' });
        res.json({
            reply: ((_a = aiResponse === null || aiResponse === void 0 ? void 0 : aiResponse.message) === null || _a === void 0 ? void 0 : _a.content) || "I hear you.",
            quickReplies: ["Tell me more", "I feel better", "Need support"]
        });
    }
    catch (err) {
        console.error('Puter AI error:', err);
        res.status(500).json({ error: 'Failed to communicate with AI', details: err.message });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
