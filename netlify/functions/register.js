const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

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

  const { username, password, email, referral } = JSON.parse(req.body);

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('aichat');
  const users = db.collection('users');
  const referrals = db.collection('referrals');

  try {
    const userByUsername = await users.findOne({ username });
    const userByEmail = await users.findOne({ email });
    const referrer = await referrals.findOne({ referralCode: referral});
    const referral_valid = await referrals.findOne({ referralCode: referral, usedBy: null });

    if (userByUsername) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Username already exists' }),
      };
    }
    
    if (userByEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Email already exists' }),
      };
    }

    if (!referrer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Invalid referral code. Please contact the administrator to obtain a valid code.' }),
      };
    }

    if (!referral_valid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Referral code has already been used. Please contact the administrator to obtain a new valid code' }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword, email, referral });
    await referrals.updateOne({ referralCode: referral }, { $set: { usedBy: username, usedDate: getISTDate() } });

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