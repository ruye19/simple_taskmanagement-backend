const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'], // Select only name and email
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};