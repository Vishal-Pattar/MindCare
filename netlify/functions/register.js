const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

exports.handler = async (req, res) => {
  const { username, password } = JSON.parse(req.body);

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('aichat');
  const users = db.collection('users');

  try {
    const user = await users.findOne({ username });
    if (user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Username already exists' }),
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword });

    await client.close();
    return {
      statusCode: 201,
      body: JSON.stringify({ msg: 'User registered successfully' }),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server error' }),
    };
  }
};