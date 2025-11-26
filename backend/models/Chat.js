const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  type: { type: String, enum: ['direct', 'group'], required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For direct: 2 users; for group: multiple
  name: { type: String, default: '' }, // Group name (optional for direct)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Group creator
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
