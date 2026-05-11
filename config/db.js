const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
    // Production (Render): Use SQLite for zero-config deployment
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './uniskills_database.sqlite',
        logging: false
    });
} else {
    // Local Development: Use MySQL
    sequelize = new Sequelize(
        process.env.DB_NAME || 'uniskills_db',
        process.env.DB_USER || 'root',
        process.env.DB_PASS || '',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false
        }
    );
}

module.exports = sequelize;