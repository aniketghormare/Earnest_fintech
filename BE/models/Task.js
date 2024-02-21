// models/Task.js
const db = require('../db');

async function getAllTasks() {
  try {
    return await db.select().from('tasks');
  } catch (error) {
    throw new Error('Error retrieving tasks');
  }
}

async function createTask(title, description) {
  try {
    await db('tasks').insert({ title, description });
  } catch (error) {
    throw new Error('Error adding task');
  }
}

async function updateTask(id, completed) {
  try {
    await db('tasks').where({ id }).update({ completed });
  } catch (error) {
    throw new Error('Error updating task');
  }
}

async function deleteTask(id) {
  try {
    await db('tasks').where({ id }).del();
  } catch (error) {
    throw new Error('Error deleting task');
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
