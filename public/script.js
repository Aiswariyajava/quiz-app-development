// Initialize Socket.io connection
const socket = io();

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const usersList = document.getElementById('users-list');
const userCount = document.getElementById('user-count');
const currentUsernameDisplay = document.getElementById('current-username');
const logoutBtn = document.getElementById('logout-btn');
const typingIndicator = document.getElementById('typing-indicator');
const typingUser = document.getElementById('typing-user');

// State variables
let currentUsername = '';
let typingTimeout;

// Login functionality
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    
    if (username.length < 2) {
        alert('Name must be at least 2 characters');
        return;
    }
    
    currentUsername = username;
    socket.emit('user-join', username);
    
    // Switch screens
    loginScreen.classList.remove('active');
    chatScreen.classList.add('active');
    
    // Focus on message input
    setTimeout(() => messageInput.focus(), 100);
});

// Message sending
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    
    if (text.length === 0) return;
    
    socket.emit('send-message', text);
    messageInput.value = '';
    messageInput.focus();
    
    // Hide typing indicator
    clearTimeout(typingTimeout);
    typingIndicator.classList.add('hidden');
});

// Typing indicator
messageInput.addEventListener('input', () => {
    socket.emit('typing');
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingIndicator.classList.add('hidden');
    }, 3000);
});

// Load message history
socket.on('load-messages', (messages) => {
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        displayMessage(message);
    });
    scrollToBottom();
});

// Receive new messages
socket.on('new-message', (message) => {
    // Add username to know if it's our own message
    message.isOwn = message.userId === socket.id;
    displayMessage(message);
    scrollToBottom();
});

// Display system messages
socket.on('system-message', (message) => {
    const systemMessageEl = document.createElement('div');
    systemMessageEl.className = 'system-message';
    systemMessageEl.textContent = message.text;
    messagesContainer.appendChild(systemMessageEl);
    scrollToBottom();
});

// Update users list
socket.on('user-list', (users) => {
    userCount.textContent = users.length;
    
    if (users.length === 0) {
        usersList.innerHTML = '<li class="empty-state">No users yet...</li>';
        return;
    }
    
    usersList.innerHTML = users.map(user => {
        const isCurrentUser = user.name === currentUsername;
        return `
            <li ${isCurrentUser ? 'style="background: var(--primary-color); color: white;"' : ''}>
                <span class="online-indicator"></span>
                ${user.name}${isCurrentUser ? ' (You)' : ''}
            </li>
        `;
    }).join('');
});

// Show typing indicator
socket.on('user-typing', (username) => {
    if (username !== currentUsername) {
        typingUser.textContent = `${username} is typing`;
        typingIndicator.classList.remove('hidden');
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, 3000);
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave the chat?')) {
        socket.disconnect();
        currentUsername = '';
        chatScreen.classList.remove('active');
        loginScreen.classList.add('active');
        usernameInput.value = '';
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <h2>👋 Welcome to Chat Room!</h2>
                <p>Start a conversation with others. Messages are saved in this session.</p>
            </div>
        `;
        usersList.innerHTML = '<li class="empty-state">No users yet...</li>';
        usernameInput.focus();
        
        // Reconnect after disconnect
        setTimeout(() => {
            socket.connect();
        }, 500);
    }
});

// Display message in chat
function displayMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${message.isOwn ? 'own' : ''}`;
    
    const timestamp = new Date(message.timestamp);
    const timeString = timestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    messageEl.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <span class="message-username">${escapeHtml(message.username)}</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-text">${escapeHtml(message.text)}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
}

// Scroll to bottom of messages
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML special characters to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Auto-focus username input on page load
usernameInput.focus();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + Enter to send message
    if (e.altKey && e.key === 'Enter' && document.activeElement === messageInput) {
        messageForm.dispatchEvent(new Event('submit'));
    }
});

// Prevent accidental page close
window.addEventListener('beforeunload', (e) => {
    if (currentUsername) {
        e.preventDefault();
        e.returnValue = '';
    }
});

console.log('Chat application loaded successfully');
