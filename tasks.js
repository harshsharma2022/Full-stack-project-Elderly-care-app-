const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const cron = require('node-cron');
const { sendNotification } = require('../utils/notifications');

// Get all tasks for a specific date
router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const tasks = await Task.find({
      user: req.user.id,
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))
      }
    }).sort({ time: 1 });
    
    res.json(tasks);
  } catch (err) {
    console.error('Error in GET /api/tasks:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, time, category } = req.body;
    
    if (!title || !date || !time) {
      return res.status(400).json({ message: 'Please provide title, date, and time' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      date: new Date(date),
      time,
      category: category || 'other'
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error in POST /api/tasks:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', error: err.message });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, date, time, completed, category } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.date = date ? new Date(date) : task.date;
    task.time = time || task.time;
    task.completed = completed !== undefined ? completed : task.completed;
    task.category = category || task.category;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('Error in PUT /api/tasks/:id:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error('Error in DELETE /api/tasks/:id:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Schedule task reminders
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      date: {
        $gte: now.setHours(0, 0, 0, 0),
        $lt: now.setHours(23, 59, 59, 999)
      },
      completed: false,
      'notifications.sent': false
    }).populate('user');

    for (const task of tasks) {
      const taskTime = new Date(`${task.date.toISOString().split('T')[0]}T${task.time}`);
      const timeDiff = taskTime - now;

      if (timeDiff <= 60000 && timeDiff > 0) { // 1 minute before
        await sendNotification(task.user, {
          title: 'Task Reminder',
          body: `Task: ${task.title} is due in 1 minute`
        });

        task.notifications.push({
          type: 'push',
          sent: true,
          sentAt: new Date()
        });
        await task.save();
      }
    }
  } catch (error) {
    console.error('Error in task reminder cron job:', error);
  }
});

module.exports = router; 