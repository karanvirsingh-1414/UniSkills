const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User } = require('../models');
const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/\s+/g, '-');
        cb(null, Date.now() + '-' + cleanName);
    }
});
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only strictly .pdf files are allowed for Resumes!'), false);
    }
});
router.post('/resume', upload.single('resumePdf'), async (req, res) => {
    try {
        const { userId } = req.body;
        if (!req.file) return res.status(400).json({ error: "No file was attached in FormData!" });
        const localUrl = `/uploads/${req.file.filename}`;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "Authenticated Ecosystem User not found" });
        user.resumeUrl = localUrl;
        await user.save();
        res.status(200).json({ message: "Portfolio Document securely attached to your identity!", resumeUrl: localUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, 'pp-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadImage = multer({ 
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only pure image files are allowed for Profile Pictures!'), false);
    }
});
router.post('/profile-pic', uploadImage.single('profilePic'), async (req, res) => {
    try {
        const { userId } = req.body;
        if (!req.file) return res.status(400).json({ error: "No image attached in FormData!" });
        const localUrl = `/uploads/${req.file.filename}`;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "Authenticated Ecosystem User not found" });
        user.profilePic = localUrl;
        await user.save();
        res.status(200).json({ message: "Visual Profile Image successfully attached!", profilePic: localUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
