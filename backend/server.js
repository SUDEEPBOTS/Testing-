
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

// Socket.io for real-time
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
  });

  socket.on('sendMessage', async (data) => {
    const { chatId, senderId, content } = data;
    const message = new Message({ chat: chatId, sender: senderId, content });
    await message.save();
    io.to(chatId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
