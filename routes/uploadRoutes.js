const express = require('express');
const multer = require('multer');
const { User } = require('../models');
const { resumeStorage, profilePicStorage } = require('../config/cloudinary');

const router = express.Router();

const upload = multer({ 
    storage: resumeStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only strictly .pdf files are allowed for Resumes!'), false);
    }
});

router.post('/resume', upload.single('resumePdf'), async (req, res) => {
    try {
        const { userId } = req.body;
        if (!req.file) return res.status(400).json({ error: "No file was attached in FormData!" });
        
        const cloudUrl = req.file.path; // Cloudinary URL
        
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "Authenticated Ecosystem User not found" });
        
        user.resumeUrl = cloudUrl;
        await user.save();
        
        res.status(200).json({ message: "Portfolio Document securely attached to your identity!", resumeUrl: cloudUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const uploadImage = multer({ 
    storage: profilePicStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only pure image files are allowed for Profile Pictures!'), false);
    }
});

router.post('/profile-pic', uploadImage.single('profilePic'), async (req, res) => {
    try {
        const { userId } = req.body;
        if (!req.file) return res.status(400).json({ error: "No image attached in FormData!" });
        
        const cloudUrl = req.file.path; // Cloudinary URL
        
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "Authenticated Ecosystem User not found" });
        
        user.profilePic = cloudUrl;
        await user.save();
        
        res.status(200).json({ message: "Visual Profile Image successfully attached!", profilePic: cloudUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
