const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/EmergencyContact');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendNotification } = require('../utils/notifications');
const { sendSMS } = require('../utils/sms');

// Get all emergency contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new emergency contact
router.post('/contacts', auth, async (req, res) => {
  try {
    const contact = new EmergencyContact({
      ...req.body,
      user: req.user.id
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact data' });
  }
});

// Update an emergency contact
router.patch('/contacts/:id', auth, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact data' });
  }
});

// Delete an emergency contact
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send SOS alert
router.post('/sos', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const contacts = await EmergencyContact.find({ user: req.user.id });

    // Get user's location if available
    const location = req.body.location || 'Location not available';

    // Send notifications to all emergency contacts
    for (const contact of contacts) {
      // Send push notification
      await sendNotification(contact, {
        title: 'EMERGENCY ALERT',
        body: `${user.name} needs immediate assistance! Location: ${location}`
      });

      // Send SMS if phone number is available
      if (contact.phone) {
        await sendSMS(contact.phone, `EMERGENCY: ${user.name} needs immediate assistance! Location: ${location}`);
      }
    }

    res.json({ message: 'Emergency alert sent to all contacts' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send emergency alert' });
  }
});

// Set primary emergency contact
router.patch('/contacts/:id/primary', auth, async (req, res) => {
  try {
    // First, set all contacts to non-primary
    await EmergencyContact.updateMany(
      { user: req.user.id },
      { isPrimary: false }
    );

    // Then set the specified contact as primary
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isPrimary: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 