# 💬 Real-Time Chat Application

A modern, responsive, and user-friendly real-time chat application built with Node.js, Express, and Socket.io.

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using WebSockets
- **Message History**: All messages are preserved during the session
- **User List**: See who's online in the chat room
- **Typing Indicator**: Know when someone is typing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **System Notifications**: Get notified when users join or leave
- **Beautiful UI**: Modern dark theme with gradient accents
- **XSS Protection**: Safe HTML escaping for all user inputs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd task1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

### For Development (with auto-reload)
```bash
npm run dev
```

Note: Make sure you have `nodemon` installed (it's included in the dependencies)

## 📖 How to Use

1. **Open the application** in your web browser: `http://localhost:3000`
2. **Enter your name** and click "Join Chat"
3. **Start chatting** with other users in the room
4. **See online users** in the sidebar on the left
5. **Type a message** and press Enter or click Send
6. **Leave the chat** by clicking the "Leave" button

## 🎨 Features Explained

### Real-Time Communication
- Messages are sent and received instantly using Socket.io
- All connected users see messages in real-time

### Message History
- When you join, you'll see all previous messages from this session
- Messages are stored in server memory

### User Presence
- The online users list updates automatically
- See when someone joins or leaves the chat
- Your name is highlighted as "(You)" in the users list

### Typing Indicator
- Other users see when you're typing
- Automatically disappears after 3 seconds of inactivity

### Responsive Design
- **Desktop**: Full sidebar with user list
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Compact layout with horizontal user list

## 🛠️ Technical Stack

**Backend:**
- Node.js
- Express.js
- Socket.io

**Frontend:**
- HTML5
- CSS3 (with CSS Variables and Flexbox)
- Vanilla JavaScript (ES6+)
- Socket.io Client

## 📁 Project Structure

```
task1/
├── server.js              # Express server and Socket.io setup
├── package.json           # Node.js dependencies
├── README.md              # This file
└── public/
    ├── index.html         # Main HTML file
    ├── styles.css         # Styling and responsive design
    └── script.js          # Client-side JavaScript logic
```

## 🎯 Key Functions

### Server-Side (server.js)
- **user-join**: Handles new users joining the chat
- **send-message**: Broadcasts messages to all connected users
- **typing**: Sends typing indicator
- **disconnect**: Handles user disconnection

### Client-Side (script.js)
- **displayMessage()**: Renders messages in the chat
- **escapeHtml()**: Prevents XSS attacks
- **scrollToBottom()**: Auto-scrolls to latest messages
- Event listeners for user interactions

## 🔒 Security Features

- **XSS Protection**: All user inputs are HTML-escaped
- **Disconnect Handling**: Graceful cleanup when users leave
- **Input Validation**: Username and message length validation
- **CORS Enabled**: Safe cross-origin requests

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Points

This project is perfect for beginners to learn:
- WebSocket real-time communication
- Event-driven architecture
- Frontend-backend integration
- Responsive web design
- DOM manipulation
- Client-server synchronization

## 💡 Future Enhancement Ideas

- User authentication
- Private messaging
- Chat rooms
- Message reactions/emojis
- Voice/video calls
- Message persistence (Database)
- User profiles
- Message search

## 📝 Notes

- Messages are stored in server memory only (will be lost on server restart)
- For production use, integrate with a database (MongoDB, PostgreSQL, etc.)
- Increase security with user authentication and authorization

## 🤝 Contributing

Feel free to fork and improve this project!

## 📄 License

MIT License - Feel free to use this project however you like!

---

**Happy Chatting! 💬**
