// routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const { createSession, endSession } = require('../controllers/sessionController');

// Route to create a new learning session
router.post('/create', createSession);

// Route to end session
router.post('/end', endSession);

// Route for credit transactions
router.post('/add-credits', (req, res) => {
    res.json({ message: "Credits successfully added to the wallet." });
});

module.exports = router;