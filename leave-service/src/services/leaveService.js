const Leave = require('../models/Leave');
const User = require('../models/User');
const AppError = require('../utils/appError');

exports.calculateLeaveBalance = async (userId) => {
  const user = await User.findById(userId);
  const currentYear = new Date().getFullYear();
  
  const leaves = await Leave.find({
    user: userId,
    startDate: { $gte: new Date(`${currentYear}-01-01`) },
    status: { $in: ['APPROVED', 'PENDING'] },
  });
  
  // Calculate used and pending leave days by type
  const balance = {
    PTO: { total: 20, used: 0, pending: 0 },
    SICK: { total: 10, used: 0, pending: 0 },
    COMPASSIONATE: { total: 5, used: 0, pending: 0 },
    MATERNITY: { total: 90, used: 0, pending: 0 },
    UNPAID: { total: 0, used: 0, pending: 0 },
  };
  
  leaves.forEach(leave => {
    if (leave.status === 'APPROVED') {
      balance[leave.type].used += leave.days;
    } else if (leave.status === 'PENDING') {
      balance[leave.type].pending += leave.days;
    }
  });
  
  // Calculate remaining
  Object.keys(balance).forEach(type => {
    balance[type].remaining = balance[type].total - balance[type].used;
  });
  
  return balance;
};

exports.validateLeaveRequest = async (userId, leaveData) => {
  const { type, startDate, endDate } = leaveData;
  
  // Check if dates are valid
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start < new Date()) {
    throw new AppError('Start date cannot be in the past', 400);
  }
  
  // Check leave balance for PTO
  if (type === 'PTO') {
    const balance = await this.calculateLeaveBalance(userId);
    const requestedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    if (balance.PTO.remaining < requestedDays) {
      throw new AppError('Insufficient PTO balance', 400);
    }
  }
  
  return true;
};