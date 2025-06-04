const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const cron = require('node-cron');
const { sendNotification } = require('../utils/notifications');
const axios = require('axios');

// Get all medicines
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user.id }).sort('time');
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new medicine
router.post('/', auth, async (req, res) => {
  try {
    const medicine = new Medicine({
      ...req.body,
      user: req.user.id
    });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: 'Invalid medicine data' });
  }
});

// Update a medicine
router.patch('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(400).json({ message: 'Invalid medicine data' });
  }
});

// Mark medicine as taken
router.patch('/:id/take', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        lastTaken: new Date(),
        status: 'active'
      },
      { new: true }
    );
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(400).json({ message: 'Invalid medicine data' });
  }
});

// Delete a medicine
router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get medicine information from OpenFDA API
router.get('/search/:name', auth, async (req, res) => {
  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json?search=brand_name:${req.params.name}&limit=1`);
    res.json(response.data.results[0]);
  } catch (error) {
    res.status(404).json({ message: 'Medicine not found in database' });
  }
});

// Schedule medicine reminders
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const medicines = await Medicine.find({
      status: 'active',
      'notifications.sent': false
    }).populate('user');

    for (const medicine of medicines) {
      const medicineTime = new Date(`${now.toISOString().split('T')[0]}T${medicine.time}`);
      const timeDiff = medicineTime - now;

      if (timeDiff <= 60000 && timeDiff > 0) { // 1 minute before
        await sendNotification(medicine.user, {
          title: 'Medicine Reminder',
          body: `Time to take ${medicine.name} (${medicine.dosage})`
        });

        medicine.notifications.push({
          type: 'push',
          sent: true,
          sentAt: new Date()
        });
        await medicine.save();
      }
    }
  } catch (error) {
    console.error('Error in medicine reminder cron job:', error);
  }
});

// Check for missed doses
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const medicines = await Medicine.find({
      status: 'active',
      lastTaken: { $lt: new Date(now.setHours(now.getHours() - 1)) }
    }).populate('user');

    for (const medicine of medicines) {
      medicine.status = 'missed';
      await medicine.save();

      await sendNotification(medicine.user, {
        title: 'Missed Medicine Alert',
        body: `You missed your dose of ${medicine.name}`
      });
    }
  } catch (error) {
    console.error('Error in missed medicine check:', error);
  }
});

module.exports = router; 