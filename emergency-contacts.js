const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/EmergencyContact');
const auth = require('../middleware/auth');

// Get all emergency contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user.id }).sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new emergency contact
router.post('/', auth, async (req, res) => {
  try {
    const { name, phone, relationship, notes } = req.body;
    const newContact = new EmergencyContact({
      user: req.user.id,
      name,
      phone,
      relationship,
      notes
    });
    await newContact.save();
    res.json(newContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update emergency contact
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, phone, relationship, notes } = req.body;
    const contact = await EmergencyContact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.relationship = relationship || contact.relationship;
    contact.notes = notes || contact.notes;

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete emergency contact
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await contact.remove();
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 