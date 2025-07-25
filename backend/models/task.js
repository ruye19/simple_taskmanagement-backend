// Sequelize model for the Task.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Import User model for association

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // This is a reference to the User model
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Define association: A Task belongs to a User
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Define association: A User can have many Tasks
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Task;