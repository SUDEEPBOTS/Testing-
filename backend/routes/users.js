
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Search users by username or name
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { username: new RegExp(query, 'i') },
        { name: new RegExp(query, 'i') }
      ],
      _id: { $ne: req.user._id } // Exclude self
    }).select('name username avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
