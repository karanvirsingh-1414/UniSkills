// controllers/skillController.js
const Skill = require('../models/Skill');

// Function: Database mein nayi skill add karna
exports.addSkill = async (req, res) => {
    try {
        const { name, category } = req.body;
        
        const newSkill = await Skill.create({
            name,
            category
        });

        res.status(201).json({ message: "New skill added to platform successfully!", skill: newSkill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function: Database se saari available skills dikhana
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
