const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastTaken: Date,
  nextDose: Date,
  prescription: {
    doctor: String,
    date: Date,
    refillDate: Date
  },
  sideEffects: [String],
  interactions: [String],
  status: {
    type: String,
    enum: ['active', 'completed', 'missed'],
    default: 'active'
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

module.exports = mongoose.model('Medicine', medicineSchema); 