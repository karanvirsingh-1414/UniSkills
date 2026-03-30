const express = require('express');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io');
require('dotenv').config();
const { sequelize } = require('./models');
sequelize.sync({ alter: true }).then(() => {
    console.log("🟢 Database Connected & Synced! Dashboard Ecosystem is LIVE.");
}).catch(err => {
    console.log("🔴 Database Sync Failed: ", err);
});
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);
app.use('/uploads', express.static('uploads'));
const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);
app.get('/', (req, res) => {
    res.json({ message: "Welcome to UniSkills API. Server is running perfectly!" });
});
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.set('socketio', io);
io.on('connection', (socket) => {
    console.log(`Live user connected with ID: ${socket.id}`);
    socket.on('join_user_room', (userId) => {
        socket.join(`user_room_${userId}`);
        console.log(`User ${userId} joined room for live UI updates.`);
    });
    socket.on('demo_send_request', (data) => {
        io.to(`user_room_${data.toUserId}`).emit('demo_receive_request', data);
    });
    console.log('Live user connected with ID:', socket.id);
    socket.on('initiate_video_call', (data) => {
        io.emit(`incoming_video_call_${data.targetId}`, data);
    });
    socket.on('accept_video_call', (data) => {
        io.emit(`video_call_accepted_${data.callerId}`, data);
    });
    socket.on('reject_video_call', (data) => {
        io.emit(`video_call_rejected_${data.callerId}`, data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server and Socket.io are fully running on port: ${PORT}`);
});
