const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getISTDate = () => {
  const date = new Date();
  return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
};

exports.handler = async (req, res) => {
  if (req.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ msg: 'Method Not Allowed' }),
    };
  }
  const token = req.headers.authorization?.split(' ')[1];
  const token_sign = token.split('.')[2];

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db('aichat');
    const sessions = db.collection('sessions');

    const session = await sessions.findOne({ sessionID: token_sign });

    if (session) {
      await sessions.updateOne({ sessionID: token_sign }, { $set: { logoutAt: getISTDate() } });
    }

    await client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Logged out successfully' }),
    };

  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'Failed to log out successfully' }),
    };
  }
};
