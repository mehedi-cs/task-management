const express = require('express');
const router = express.Router();
const db = require('../config/db');
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' })
  ]
});

// GET all tasks (with pagination, search, exclude soft-deleted)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, q } = req.query;
  const offset = (page - 1) * limit;
  const maxLimit = Math.min(limit, 50);

  let sql = 'SELECT * FROM tasks WHERE deleted_at IS NULL';
  const values = [];

  if (q) {
    sql += ' AND title LIKE ?';
    values.push(`%${q}%`);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  values.push(maxLimit, offset);

  try {
    const [rows] = await db.query(sql, values);

    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM tasks WHERE deleted_at IS NULL' + (q ? ' AND title LIKE ?' : ''),
      q ? [`%${q}%`] : []
    );

    const totalPages = Math.ceil(total / maxLimit);

    res.json({
      totalTasks: total,
      totalPages,
      currentPage: parseInt(page),
      limit: maxLimit,
      data: rows
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET deleted tasks
router.get('/deleted', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    res.json(rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    const [result] = await db.query(sql, [title, description || null]);
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updates = [];
    const values = [];
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id);
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ? AND deleted_at IS NULL`;
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// PUT restore soft-deleted task
router.put('/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NULL WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const [restored] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(restored[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to restore task' });
  }
});

// DELETE task (soft delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;