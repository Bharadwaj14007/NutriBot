const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    // Fallback if API key is not configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
      return res.json({ 
        reply: "Hello! I am NutriBot. Please configure your Gemini API key in the backend .env file for me to answer your diet and nutrition questions intelligently!" 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `You are NutriBot, an expert AI Diet Planning Chatbot. Answer the following user query about nutrition, diet, health, or fitness accurately and concisely: "${message}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ msg: "Error generating response from AI." });
  }
});

module.exports = router;
