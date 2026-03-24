// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL connection setup (isme root aur password Kirtan ke hisab se change hoga baad me)
const sequelize = new Sequelize('uniskills_db', 'root', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;