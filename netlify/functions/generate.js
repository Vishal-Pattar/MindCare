const { GoogleGenerativeAI } = require('@google/generative-ai');
const { json } = require('micro');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  const { prompt } = await json(req);
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return res.json({ text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};