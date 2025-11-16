const express = require('express');
const app = express();
const port = 3000;

// JSON parsing middleware
app.use(express.json());

// In-memory storage (pre-populated with 5 tasks as per Assignment Task 1)
app.locals.tasks = [
  {
    id: 1,
    title: 'Task 1',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-01T10:00:00Z')
  },
  {
    id: 2,
    title: 'Task 2',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2024-01-02T11:00:00Z')
  },
  {
    id: 3,
    title: 'Task 3',
    completed: false,
    priority: 'low',
    createdAt: new Date('2024-01-03T12:00:00Z')
  },
  {
    id: 4,
    title: 'Task 4',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-04T13:00:00Z')
  },
  {
    id: 5,
    title: 'Task 5',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2024-01-05T14:00:00Z')
  }
];

// Mount the tasks router (updated path as per Assignment Task 4)
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

// Assignment Task 2: GET /health route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime() // Uptime in seconds
  });
});

// Optional root route for README (returns welcome message)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Task Manager API'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});