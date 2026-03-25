// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const { addSkill, getAllSkills } = require('../controllers/skillController');

// Define Skill API Endpoints
router.post('/add', addSkill);
router.get('/all', getAllSkills);

module.exports = router;
