// Routes for user profile.
const express = require('express');
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// @route   GET api/profile
// @desc    Get authenticated user profile
// @access  Private
router.get('/', auth, userController.getProfile);

module.exports = router;

// --- routes/taskRoutes.js ---
// Routes for task management.
// const express = require('express');
const { check } = require('express-validator');
// const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');



// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post(
  '/',
  [
    auth,
    check('name', 'Task name is required').not().isEmpty(),
  ],
  taskController.createTask
);

// @route   GET api/tasks
// @desc    Get all tasks for authenticated user (with pagination and search)
// @access  Private
router.get('/', auth, taskController.getTasks);

// @route   PATCH api/tasks/:id
// @desc    Update task status
// @access  Private
router.patch(
  '/:id',
  [
    auth,
    check('status', 'Status must be either "pending" or "completed"').isIn(['pending', 'completed']),
  ],
  taskController.updateTaskStatus
);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
