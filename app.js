// app.js — Exportable Express app for testing (no server.listen here)
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to UniSkills API. Server is running perfectly!" });
});

// Attach a no-op socketio to avoid crashes in test env
app.set('socketio', { emit: () => {} });

module.exports = app;
