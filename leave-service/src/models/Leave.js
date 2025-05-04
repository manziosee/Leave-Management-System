const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Leave must belong to a user'],
  },
  type: {
    type: String,
    enum: ['PTO', 'SICK', 'COMPASSIONATE', 'MATERNITY', 'UNPAID'],
    required: [true, 'Please specify leave type'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
    validate: {
      validator: function (val) {
        return val > this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
  reason: {
    type: String,
    required: function () {
      return this.type === 'SICK' || this.type === 'COMPASSIONATE';
    },
  },
  document: String,
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate leave days
leaveSchema.virtual('days').get(function () {
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
});

// Populate user data when querying leaves
leaveSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email photo role department',
  }).populate({
    path: 'approvedBy',
    select: 'name email',
  });
  next();
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;