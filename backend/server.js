// This is the main entry point for the Express application.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db'); // Import the sequelize instance
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for CORS
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json()); // Body parser for JSON requests

// Sync database
// Ensure sequelize is properly initialized before attempting to sync
if (sequelize && typeof sequelize.sync === 'function') {
  sequelize.sync({ alter: true }) // `alter: true` will update tables without dropping them
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));
} else {
  console.error('Sequelize instance is not valid in server.js, cannot sync database.');
  // Exit the process or handle this critical error appropriately
  process.exit(1);
}


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/tasks', taskRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

