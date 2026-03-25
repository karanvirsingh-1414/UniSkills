// models/Skill.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// "Skill" naam ki table ka architecture
const Skill = sequelize.define('Skill', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endorsements: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Skill;