const db = require('./config/db');

async function seed() {
  try {
    // Check if already seeded (e.g., count existing tasks)
    const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM tasks');
    if (count > 0) {
      console.log('Database already seeded. Skipping...');
      process.exit(0);
    }

    const sampleTasks = [
      { title: 'Task 1', description: 'Description 1', status: 'pending' },
      { title: 'Task 2', description: 'Description 2', status: 'in-progress' },
      { title: 'Task 3', description: 'Description 3', status: 'completed' },
      { title: 'Task 4', description: 'Description 4', status: 'pending' },
      { title: 'Task 5', description: 'Description 5', status: 'in-progress' },
      { title: 'Task 6', description: 'Description 6', status: 'completed' },
      { title: 'Task 7', description: 'Description 7', status: 'pending' },
      { title: 'Task 8', description: 'Description 8', status: 'in-progress' },
      { title: 'Task 9', description: 'Description 9', status: 'completed' },
      { title: 'Task 10', description: 'Description 10', status: 'pending' },
      { title: 'Task 11', description: 'Description 11', status: 'in-progress' },
      { title: 'Task 12', description: 'Description 12', status: 'completed' },
      { title: 'Task 13', description: 'Description 13', status: 'pending' },
      { title: 'Task 14', description: 'Description 14', status: 'in-progress' },
      { title: 'Task 15', description: 'Description 15', status: 'completed' }
    ];

    for (const task of sampleTasks) {
      await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [task.title, task.description, task.status]);
    }

    console.log('Seeded 15 sample tasks successfully.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit();
  }
}

seed();