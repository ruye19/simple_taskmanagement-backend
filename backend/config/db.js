const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelizeInstance; // Declare a variable to hold the instance

try {
  sequelizeInstance = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false, // Set to true to see SQL queries in console
    }
  );
  console.log('--- config/db.js logs ---');
  console.log('Sequelize instance successfully created in db.js.');
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('Is sequelizeInstance an object?', sequelizeInstance && typeof sequelizeInstance === 'object');
  console.log('Does sequelizeInstance have define method?', typeof sequelizeInstance.define === 'function');
  console.log('--- End config/db.js logs ---');

} catch (error) {
  console.error('Error creating Sequelize instance in db.js:', error);
  // Re-throw or handle the error to prevent further issues
  throw error;
}

module.exports = sequelizeInstance;