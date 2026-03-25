// server.js
const express = require('express');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ======== KARAN'S AUTH ROUTES ========
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// ===================================

// ======== KIRTAN'S SKILL ROUTES ========
const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);
// ===================================

// ======== ISHNEET'S ROUTES ========
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);
// ===================================

// Basic testing route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to UniSkills API. Server is running perfectly!" });
});

// ======== khushal-feature socket.io setup ========
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Live connection setup
io.on('connection', (socket) => {
    console.log(`Live user connected with ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server and Socket.io are fully running on port: ${PORT}`);
});
