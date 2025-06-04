const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['medication', 'appointment', 'grocery', 'other'],
    default: 'other'
  },
  notifications: [{
    type: {
      type: String,
      enum: ['email', 'push', 'sms']
    },
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema); 