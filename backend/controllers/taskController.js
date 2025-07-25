const Task = require('../models/task.js'); // Added .js extension
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.user.id; // User ID from auth middleware

  try {
    const newTask = await Task.create({
      name,
      userId,
      status: 'pending', // Default status
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  const { status, search, page = 1, limit = 10 } = req.query;

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const queryOptions = {
    where: { userId },
    offset: offset,
    limit: parseInt(limit),
  };

  if (status) {
    queryOptions.where.status = status;
  }

  if (search) {
    queryOptions.where.name = {
      [require('sequelize').Op.like]: `%${search}%`, // Case-insensitive search
    };
  }

  try {
    const tasks = await Task.findAll(queryOptions);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTaskStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    let task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: `Task with ID "${id}" not found.` });
    }

    // Ensure the task belongs to the authenticated user
    if (task.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this task.' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: `Task with ID "${id}" not found.` });
    }

    // Ensure the task belongs to the authenticated user
    if (task.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this task.' });
    }

    await task.destroy();
    res.status(204).send(); // No content for successful deletion
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};