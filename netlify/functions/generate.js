const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

exports.handler = async (req, res) => {
  const { prompt } = JSON.parse(req.body);

  const API_KEY = process.env.API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
