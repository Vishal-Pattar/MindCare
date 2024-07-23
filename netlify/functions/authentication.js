const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.handler = async (event) => {
  const token = event.headers.authorization?.split(' ')[1];
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
    const objectId = new ObjectId(decoded.id);

    const user = await users.findOne({ _id:objectId });
    await client.close();

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ msg: 'Token is not valid' }),
      };
    }

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