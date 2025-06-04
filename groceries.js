const express = require('express');
const router = express.Router();
const Grocery = require('../models/Grocery');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendNotification } = require('../utils/notifications');
const axios = require('axios');

// Get all groceries
router.get('/', auth, async (req, res) => {
  try {
    const groceries = await Grocery.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(groceries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new grocery item
router.post('/', auth, async (req, res) => {
  try {
    const { name, quantity, category, notes } = req.body;
    const newGrocery = new Grocery({
      user: req.user.id,
      name,
      quantity,
      category,
      notes
    });
    await newGrocery.save();
    res.json(newGrocery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update grocery item
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, quantity, category, notes, purchased } = req.body;
    const grocery = await Grocery.findById(req.params.id);
    
    if (!grocery) {
      return res.status(404).json({ msg: 'Grocery item not found' });
    }
    
    if (grocery.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    grocery.name = name || grocery.name;
    grocery.quantity = quantity || grocery.quantity;
    grocery.category = category || grocery.category;
    grocery.notes = notes || grocery.notes;
    grocery.purchased = purchased !== undefined ? purchased : grocery.purchased;

    await grocery.save();
    res.json(grocery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete grocery item
router.delete('/:id', auth, async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);
    
    if (!grocery) {
      return res.status(404).json({ msg: 'Grocery item not found' });
    }
    
    if (grocery.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await grocery.remove();
    res.json({ msg: 'Grocery item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Order a grocery item
router.patch('/:id/order', auth, async (req, res) => {
  try {
    const grocery = await Grocery.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        status: 'ordered',
        orderedBy: req.user.id,
        deliveryDate: req.body.deliveryDate
      },
      { new: true }
    );
    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    // Notify the elderly user
    const elderlyUser = await User.findById(grocery.user);
    await sendNotification(elderlyUser, {
      title: 'Grocery Order Update',
      body: `${req.user.name} has ordered ${grocery.name} for you`
    });

    res.json(grocery);
  } catch (error) {
    res.status(400).json({ message: 'Invalid grocery data' });
  }
});

// Search for grocery items using OpenFoodFacts API
router.get('/search/:name', auth, async (req, res) => {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${req.params.name}.json`);
    res.json(response.data.product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found in database' });
  }
});

// Get grocery items by status
router.get('/status/:status', auth, async (req, res) => {
  try {
    const groceries = await Grocery.find({
      user: req.user.id,
      status: req.params.status
    }).sort('priority');
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get grocery items by category
router.get('/category/:category', auth, async (req, res) => {
  try {
    const groceries = await Grocery.find({
      user: req.user.id,
      category: req.params.category
    }).sort('priority');
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 