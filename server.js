const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active users and messages
const users = new Map();
const messageHistory = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle user joining
  socket.on('user-join', (username) => {
    users.set(socket.id, { id: socket.id, name: username });
    
    // Send message history to new user
    socket.emit('load-messages', messageHistory);
    
    // Notify all users
    io.emit('user-list', Array.from(users.values()));
    io.emit('system-message', {
      timestamp: new Date(),
      text: `${username} joined the chat`
    });
    
    console.log('User joined:', username);
  });

  // Handle new messages
  socket.on('send-message', (data) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now(),
        username: user.name,
        userId: socket.id,
        text: data,
        timestamp: new Date(),
        isOwn: false
      };
      
      messageHistory.push(message);
      io.emit('new-message', message);
      console.log(`${user.name}: ${data}`);
    }
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('user-typing', user.name);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('user-list', Array.from(users.values()));
      io.emit('system-message', {
        timestamp: new Date(),
        text: `${user.name} left the chat`
      });
      console.log('User disconnected:', user.name);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
