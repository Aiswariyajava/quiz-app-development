# 🚀 Quick Start Guide

## 1️⃣ Installation (One-time setup)

```bash
# Navigate to project folder
cd task1

# Install dependencies
npm install
```

## 2️⃣ Start the Server

```bash
npm start
```

You'll see:
```
Chat server running on http://localhost:3000
```

## 3️⃣ Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

## 4️⃣ Test the Chat

1. **Open multiple browser tabs/windows** (or different browsers)
2. **Enter a name** in each tab (e.g., "Alice", "Bob")
3. **Start chatting** between tabs
4. **See the features**:
   - Messages appear in real-time
   - User list shows online users
   - Typing indicator when someone types
   - Messages are saved during session

## 🎮 Try These Features

✅ **Send Messages** - Type and press Enter  
✅ **Typing Indicator** - Start typing to show "typing..." notification  
✅ **User List** - See who's online  
✅ **System Messages** - See when users join/leave  
✅ **Message History** - New users see all previous messages  
✅ **Responsive Design** - Resize window or use mobile  

## 📱 Mobile Testing

Open `http://localhost:3000` on your phone and chat with desktop users!

## ⚙️ Development Mode (Auto-Reload)

For development with automatic server restart on file changes:
```bash
npm run dev
```

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
# Edit server.js and change PORT or kill the process
# Windows: netstat -ano | findstr :3000
```

**Dependencies not installing?**
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

**Can't see other users' messages?**
- Make sure all tabs are on `http://localhost:3000`
- Check browser console for errors (F12)
- Refresh the page

## 📚 File Structure

```
task1/
├── server.js           ← Backend logic (handles real-time chat)
├── package.json        ← Project info & dependencies
├── public/
│   ├── index.html      ← Chat interface
│   ├── styles.css      ← Beautiful styling
│   └── script.js       ← Chat functionality
└── README.md           ← Full documentation
```

## 🎨 Customization Ideas

- Change colors in `styles.css` (look for `--primary-color`, `--secondary-color`)
- Modify the welcome message in `index.html`
- Add emoji support in `script.js`
- Add username colors in `styles.css`

## ❓ Common Questions

**Q: Will my messages be saved after I close the browser?**  
A: No, messages are stored in server memory only. On restart, they're lost.

**Q: Can I host this online?**  
A: Yes! Use services like Heroku, Render, or Railway.

**Q: How do I add databases?**  
A: Replace the `messageHistory` array in `server.js` with MongoDB/PostgreSQL.

---

**Enjoy your chat app! 💬✨**
