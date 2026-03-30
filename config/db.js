const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();
const dbPath = process.env.NODE_ENV === 'production'
    ? '/tmp/uniskills.sqlite'
    : path.join(__dirname, '..', 'uniskills_database.sqlite');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
});
module.exports = sequelize;