const { MongoClient, ObjectId } = require('mongodb');
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
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'No token, authorization denied' }),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('aichat');
    const users = db.collection('users');
    const sessions = db.collection('sessions');
    const objectId = new ObjectId(decoded.id);

    const user = await users.findOne({ _id:objectId });
    const session = await sessions.findOne({ sessionID: token_sign });

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ msg: 'Token is not valid' }),
      };
    }
    if(!session){
      await sessions.insertOne({ sessionID: token_sign, username: user.username, authToken: token, createdAt: getISTDate(), logoutAt: null });
    }

    await client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ username: user.username }),
    };

  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'Token is not valid' }),
    };
  }
};