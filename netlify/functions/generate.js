const { GoogleGenerativeAI } = require('@google/generative-ai');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const getISTDate = () => {
  const date = new Date();
  return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
};

exports.handler = async (req, res) => {
  if (req.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ msg: 'Method Not Allowed' }),
    };
  }
  const token = req.headers.authorization?.split(' ')[1];
  const token_sign = token.split('.')[2];
  const { prompt } = JSON.parse(req.body);

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('aichat-chatHistory');
  const chatHistory = db.collection(token_sign);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const count = await chatHistory.countDocuments();
    await chatHistory.insertOne({ count: count + 1, prompt, response: text, createdAt: getISTDate() });

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

  } finally {
    await client.close();
  }
};