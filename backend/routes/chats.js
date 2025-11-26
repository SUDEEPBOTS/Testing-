const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate('participants', 'name username avatar');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create chat (direct or group)
router.post('/', auth, async (req, res) => {
  const { type, participants, name } = req.body;
  try {
    const chat = new Chat({ type, participants: [req.user._id, ...participants], name, createdBy: req.user._id });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get messages for a chat
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
