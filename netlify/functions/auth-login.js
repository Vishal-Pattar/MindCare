const connectDB = require('./db');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { json } = require('micro');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  await connectDB();
  const { username, password } = await json(req);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
