import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    try {
      await axios.post('http://localhost:3001/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Task Manager</h1>
      <hr />
      <div>
        <h2>Add New Task</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Title"
            style={{ padding: "5px" }}
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Description"
            style={{ padding: "5px" }}
          />
          <button onClick={addTask} style={{ padding: "5px", backgroundColor: "teal", color: "white" }}>Add Task</button>
        </div>
      </div>
      <div>
        <h2>Tasks</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul >
            {tasks.map((task) => (
              <li key={task.id} style={{ width: "100%", height: "auto", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
                  style={{ width: "10%" }}
                />
                <span  style={{ width: "20%" }}>{task.title}</span>
                <p style={{ width: "20%" }}>{task.description}</p>
                <p style={{ width: "20%" }}>{task.completed? "Completed":"Not Completed"}</p>
                <button style={{ padding: "5px", backgroundColor: "teal", color: "white" }} onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
