// Sequelize model for the User.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // This imports the sequelize instance

console.log('--- models/User.js logs ---');
console.log('Value of sequelize after import in models/User.js:', sequelize);
console.log('Is sequelize an object?', sequelize && typeof sequelize === 'object');
console.log('Does sequelize have define method?', typeof sequelize.define === 'function');
console.log('--- End models/User.js logs ---');

// Add a check here to ensure sequelize is valid before using it
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('CRITICAL ERROR: sequelize instance is not valid in models/User.js. Check config/db.js for initialization issues.');
  // This will cause the app to crash, but provides a clear error message
  throw new Error('Sequelize instance not properly initialized. Check config/db.js for database connection or environment variable issues.');
}

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = User;