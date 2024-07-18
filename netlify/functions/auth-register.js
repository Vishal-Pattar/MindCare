const connectDB = require('./db');
const User = require('./models/User');
const { json } = require('micro');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  await connectDB();
  const { username, password } = await json(req);
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, password });
    await user.save();
    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};