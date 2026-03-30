const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "User already exists with this email." });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({ message: "User registered successfully!", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials. Wrong password." });
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET || 'supersecretkey_uniskills', 
            { expiresIn: '1h' }
        );
        res.status(200).json({ 
            message: "Login successful!", 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                credits: user.credits,
                rating: user.rating
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
