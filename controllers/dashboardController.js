const User = require('../models/User');
const Skill = require('../models/Skill');
const Session = require('../models/Session');

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalSkills = await Skill.count();
        const totalSessions = await Session.count();

        res.status(200).json({
            success: true,
            totalUsers,
            totalSkills,
            totalSessions
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching stats' });
    }
};

module.exports = { getDashboardStats };
