const express = require('express');
const router = express.Router();

// GET /tasks - Retrieve all tasks (enhanced as per lab, returns success/data)
router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// POST /tasks - Create a new task (with validation and error handling)
router.post('/', (req, res) => {
  try {
    const { title, priority } = req.body;
    // Input validation (as per lab and Assignment Task 5 principles)
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a non-empty string'
      });
    }
    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = priority && validPriorities.includes(priority) ? priority : 'medium'; // Default to medium

    const newTask = {
      id: Date.now(), // Unique ID
      title: title.trim(),
      completed: false,
      priority: taskPriority,
      createdAt: new Date() // JS Date object
    };
    req.app.locals.tasks.push(newTask);
    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Assignment Task 3 & 5: GET /task/:id - Retrieve a task by ID with error handling
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Validate ID format (Task 5)
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }
  const task = req.app.locals.tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }
  res.status(200).json(task);
});

module.exports = router;