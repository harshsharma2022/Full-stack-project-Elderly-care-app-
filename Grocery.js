const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  purchased: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Grocery', GrocerySchema); 