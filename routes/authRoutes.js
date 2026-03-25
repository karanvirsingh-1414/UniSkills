// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import logic from controller
const { registerUser, loginUser } = require('../controllers/authController');

// Define API Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
