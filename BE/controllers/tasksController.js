// controllers/tasksController.js
const Task = require('../models/Task');

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTask(req, res) {
  const { title, description } = req.body;
  try {
    await Task.createTask(title, description);
    res.status(201).send('Task added successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    await Task.updateTask(id, completed);
    res.send('Task updated successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await Task.deleteTask(id);
    res.send('Task deleted successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
