# 🏗️ Architecture & Project Structure

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CHAT APPLICATION                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐          ┌──────────────────────┐
│   CLIENT BROWSER     │          │   SERVER (Node.js)   │
│   (Frontend)         │◄────────►│   (Backend)          │
│                      │ WebSocket│                      │
└──────────────────────┘          └──────────────────────┘
   - HTML Interface                  - Express.js
   - CSS Styling                     - Socket.io
   - JavaScript Logic                - User Management
   - Socket.io Client                - Message Storage
```

## 📁 Project Directory Structure

```
task1/
│
├── 📄 server.js                    # Main server file (Express + Socket.io)
├── 📄 package.json                 # Node.js dependencies and metadata
├── 📄 .gitignore                   # Git ignore rules
│
├── 📚 Documentation/
│   ├── README.md                   # Full project documentation
│   ├── QUICKSTART.md               # Quick setup guide
│   ├── TESTING.md                  # Testing and demo guide
│   ├── FEATURES.md                 # Feature details
│   └── ARCHITECTURE.md             # This file
│
└── 📁 public/                      # Frontend files (served to browser)
    ├── index.html                  # Main HTML structure
    ├── styles.css                  # All CSS styling
    └── script.js                   # Client-side JavaScript
```

## 🔄 Data Flow Diagram

```
USER ACTION (Browser)
        ↓
    JavaScript Event
        ↓
Socket.io Emit Event
        ↓
    Server Receives
        ↓
Server Processing
        ↓
Update Server State
        ↓
Broadcast to All Clients
        ↓
Other Clients Receive
        ↓
Update UI (DOM)
        ↓
User Sees Message/Update
```

## 🔌 Socket.io Events

### Client → Server (Emit)
```
user-join: Send username when joining
send-message: Send new message
typing: Send typing notification
```

### Server → Client (On)
```
load-messages: Receive message history on join
new-message: Receive new messages in real-time
user-list: Receive updated list of online users
system-message: Receive join/leave notifications
user-typing: Receive typing notifications from others
```

## 🗂️ File Responsibilities

### server.js (Backend - ~120 lines)
**Purpose**: Handle server logic and real-time communication

**Key Responsibilities**:
- ✅ Start Express server on port 3000
- ✅ Setup Socket.io for WebSocket communication
- ✅ Handle user joins and disconnects
- ✅ Store messages in memory
- ✅ Manage online users list
- ✅ Broadcast events to all connected clients

**Key Objects**:
- `users`: Map to store active users and their info
- `messageHistory`: Array to store all messages
- `socket`: WebSocket connection for each user

### public/index.html (Frontend Structure - ~200 lines)
**Purpose**: Define the layout and structure of the chat interface

**Key Sections**:
- ✅ Login Screen: Form to enter username
- ✅ Chat Screen: Main chat interface
- ✅ Header: Shows app title and user info
- ✅ Sidebar: Shows online users list
- ✅ Message Area: Displays messages
- ✅ Input Area: Message input and send button

**Key Elements**:
- Login form with username input
- Messages container for chat history
- Users list in sidebar
- Message form with input and send button
- Typing indicator display

### public/styles.css (Frontend Styling - ~600 lines)
**Purpose**: Create beautiful, responsive design

**Key Sections**:
- ✅ Variables: Color scheme and spacing
- ✅ General Styles: Base element styling
- ✅ Login Screen: Login form styling
- ✅ Chat Layout: Chat interface styling
- ✅ Messages: Message bubble styling
- ✅ Animations: Transitions and keyframe animations
- ✅ Responsive: Media queries for mobile/tablet

**Color Scheme**:
```
Primary:   #6366f1 (Indigo)
Secondary: #ec4899 (Pink)
Background: #0f172a (Dark Blue)
Surface:   #1e293b (Dark Gray-Blue)
Text:      #f1f5f9 (Light Blue)
```

### public/script.js (Frontend Logic - ~250 lines)
**Purpose**: Handle client-side functionality and Socket.io events

**Key Functions**:
- ✅ `displayMessage()`: Render message in chat
- ✅ `escapeHtml()`: Prevent XSS attacks
- ✅ `scrollToBottom()`: Auto-scroll to latest message
- ✅ Event listeners for forms and user actions
- ✅ Socket.io event handlers for real-time updates

**State Management**:
- `currentUsername`: Stores logged-in user's name
- `typingTimeout`: Manages typing indicator timing
- `socket`: Socket.io client instance

---

## 🔐 Security Architecture

```
USER INPUT
   ↓
INPUT VALIDATION
├─ Username length check (2+ chars)
└─ Message not empty
   ↓
HTML ESCAPING (escapeHtml function)
├─ & → &amp;
├─ < → &lt;
├─ > → &gt;
├─ " → &quot;
└─ ' → &#039;
   ↓
SAFE DISPLAY
   ↓
USER SEES SAFE CONTENT
```

---

## 📱 Responsive Design Breakpoints

```
Desktop     ≥ 1024px  │ Full sidebar + full message area
            │ User list visible
            │ Wide layout
────────────┼──────────────────────────────────
Tablet      768px     │ Narrower sidebar (180px)
            - 1023px  │ Optimized spacing
            │ Touch-friendly buttons
────────────┼──────────────────────────────────
Mobile      < 768px   │ Horizontal user list
            │ Full-width message area
            │ Compact design
            │ One-hand usable
```

---

## 🔄 User Flow Diagram

```
START
  ↓
[Login Screen]
  ↓ (Enter name & click Join)
  ↓
[Emit: user-join]
  ↓
[Server: Add to users map]
[Server: Load & emit message history]
[Server: Broadcast updated user list]
[Server: Send system message]
  ↓
[Chat Screen appears]
  ↓
┌─ User can now:
│  ├─ Send messages
│  ├─ See typing indicator
│  ├─ See user list updates
│  └─ See system messages
│
└─ [Click Leave button or close browser]
   ↓
[Emit: disconnect]
   ↓
[Server: Remove from users map]
[Server: Broadcast updated user list]
[Server: Send system message]
   ↓
[Back to Login Screen]
```

---

## 💬 Message Object Structure

```javascript
{
  id: 1234567890,              // Unique timestamp-based ID
  username: "Alice",           // Sender's username
  userId: "socket-id-xyz",     // Unique socket ID
  text: "Hello everyone!",     // Message content
  timestamp: Date object,      // When message was sent
  isOwn: false                 // Whether current user sent it
}
```

---

## 👤 User Object Structure

```javascript
{
  id: "socket-id-xyz",         // Unique socket ID
  name: "Alice"                // Username
}
```

---

## 🔗 Communication Sequence Diagram

```
Browser A          Server          Browser B
   │                 │               │
   │─ user-join ────→│               │
   │                 │─ user-list ──→│
   │─ load-messages →│
   │←─ load-messages │
   │                 │
   │─ send-message ──→│
   │                 │─ new-message ─→│
   │←─ new-message ───│
   │                 │
   │─ typing ────────→│
   │                 │─ user-typing ──→│
   │                 │←─ [user types]
   │                 │─ new-message ──→│
   │
   │─ [disconnect] ──→│
   │                 │─ user-list ───→│
   │                 │─ system-msg ──→│
```

---

## ⚙️ Server Event Handlers

```javascript
io.on('connection') {
  ├─ socket.on('user-join')
  │  ├─ Add user to users map
  │  ├─ Emit load-messages (to new user)
  │  ├─ Emit user-list (to all)
  │  └─ Emit system-message (to all)
  │
  ├─ socket.on('send-message')
  │  ├─ Get sender from users map
  │  ├─ Create message object
  │  ├─ Store in messageHistory
  │  └─ Emit new-message (to all)
  │
  ├─ socket.on('typing')
  │  └─ Emit user-typing (to others)
  │
  └─ socket.on('disconnect')
     ├─ Remove from users map
     ├─ Emit user-list (to all)
     └─ Emit system-message (to all)
}
```

---

## 📊 State Management

### Server State
```
Server Memory
├─ users Map
│  └─ socket-id → { id, name }
│
├─ messageHistory Array
│  └─ [{ id, username, userId, text, timestamp }...]
│
└─ Socket connections
   └─ socket objects for each client
```

### Client State
```
Browser Memory (JavaScript)
├─ currentUsername: String
├─ typingTimeout: Number
├─ socket: Socket.io instance
│
└─ DOM State
   ├─ messagesContainer
   ├─ usersList
   ├─ messageInput
   └─ typingIndicator
```

---

## 🚀 Startup Sequence

```
1. npm start
   ↓
2. Node.js loads server.js
   ↓
3. Express app created
   ↓
4. HTTP server created
   ↓
5. Socket.io initialized
   ↓
6. Static files configured (public/)
   ↓
7. Routes defined
   ↓
8. Server listens on port 3000
   ↓
9. Browser opens http://localhost:3000
   ↓
10. public/index.html loaded
    ↓
11. public/styles.css applied
    ↓
12. public/script.js executed
    ↓
13. Socket.io client connects
    ↓
14. Login screen shown
    ↓
15. Ready for user input
```

---

## 🎯 Component Interaction

```
┌──────────────────────────────────────────────┐
│         User Interface (HTML)                │
│  ┌──────────────────────────────────────┐   │
│  │  Login Screen / Chat Screen         │   │
│  │  ┌────────────────────────────────┐ │   │
│  │  │  Messages Container            │ │   │
│  │  │  Users Sidebar                 │ │   │
│  │  │  Message Input Form            │ │   │
│  │  └────────────────────────────────┘ │   │
│  └──────────────────────────────────────┘   │
│           ↑          ↓          ↑            │
│      Rendering    User Event  Click/Submit  │
│           ↓          ↑          ↓            │
└──────────────────────────────────────────────┘
          │
      JavaScript Event
      Handling Logic
          │
      ┌───────────────────┐
      │  Socket.io Client │
      └───────────────────┘
          │
      WebSocket
      Communication
          │
      ┌───────────────────┐
      │  Socket.io Server │
      └───────────────────┘
          │
      Event Processing
      State Management
          │
      Broadcast to
      All Clients
```

---

## 📈 Scalability Considerations

Current Implementation:
- ✅ Single Node.js process
- ✅ In-memory storage
- ✅ Works for ~100-500 concurrent users

To Scale:
- 🔄 Add Node.js clustering
- 🔄 Use Redis for shared state
- 🔄 Add database for persistence
- 🔄 Deploy multiple server instances
- 🔄 Add load balancer (nginx)

---

This architecture provides a solid foundation for a beginner-friendly, production-ready chat application! 🎉
