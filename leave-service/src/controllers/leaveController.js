const Leave = require('../models/Leave');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../services/notificationService');

// Helper function to calculate leave balance
const calculateLeaveBalance = async (userId) => {
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

exports.getLeaveBalance = catchAsync(async (req, res, next) => {
  const balance = await calculateLeaveBalance(req.user.id);
  res.status(200).json({
    status: 'success',
    data: balance,
  });
});

exports.applyForLeave = catchAsync(async (req, res, next) => {
  const { type, startDate, endDate, reason, document } = req.body;
  
  // Check if dates are valid
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start < new Date()) {
    return next(new AppError('Start date cannot be in the past', 400));
  }
  
  // Check leave balance for PTO
  if (type === 'PTO') {
    const balance = await calculateLeaveBalance(req.user.id);
    const requestedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    if (balance.PTO.remaining < requestedDays) {
      return next(new AppError('Insufficient PTO balance', 400));
    }
  }
  
  const leave = await Leave.create({
    user: req.user.id,
    type,
    startDate: start,
    endDate: end,
    reason,
    document,
  });
  
  // Notify manager
  const manager = await User.findOne({ 
    department: req.user.department, 
    role: 'manager' 
  });
  
  if (manager) {
    await new Email(manager, req.user).sendLeaveRequestNotification(leave);
  }
  
  res.status(201).json({
    status: 'success',
    data: leave,
  });
});

exports.getMyLeaves = catchAsync(async (req, res, next) => {
  const leaves = await Leave.find({ user: req.user.id })
    .sort('-createdAt');
  
  res.status(200).json({
    status: 'success',
    results: leaves.length,
    data: leaves,
  });
});

exports.getLeavesToApprove = catchAsync(async (req, res, next) => {
  // Get all users in the same department
  const users = await User.find({ 
    department: req.user.department,
    _id: { $ne: req.user.id } // Exclude self
  });
  
  const leaves = await Leave.find({ 
    user: { $in: users.map(u => u._id) },
    status: 'PENDING',
  }).sort('-createdAt');
  
  res.status(200).json({
    status: 'success',
    results: leaves.length,
    data: leaves,
  });
});

exports.approveLeave = catchAsync(async (req, res, next) => {
  const { comments } = req.body;
  
  const leave = await Leave.findOneAndUpdate(
    { 
      _id: req.params.id, 
      status: 'PENDING',
      // Ensure the leave belongs to someone in the same department
      user: { $in: await User.find({ department: req.user.department }).distinct('_id') }
    },
    { 
      status: 'APPROVED',
      approvedBy: req.user.id,
      comments,
    },
    { new: true, runValidators: true }
  );
  
  if (!leave) {
    return next(new AppError('Leave not found or already processed', 404));
  }
  
  // Notify employee
  const employee = await User.findById(leave.user);
  await new Email(employee, req.user).sendLeaveApprovalNotification(leave);
  
  res.status(200).json({
    status: 'success',
    data: leave,
  });
});

exports.rejectLeave = catchAsync(async (req, res, next) => {
  const { comments } = req.body;
  
  const leave = await Leave.findOneAndUpdate(
    { 
      _id: req.params.id, 
      status: 'PENDING',
      // Ensure the leave belongs to someone in the same department
      user: { $in: await User.find({ department: req.user.department }).distinct('_id') }
    },
    { 
      status: 'REJECTED',
      approvedBy: req.user.id,
      comments,
    },
    { new: true, runValidators: true }
  );
  
  if (!leave) {
    return next(new AppError('Leave not found or already processed', 404));
  }
  
  // Notify employee
  const employee = await User.findById(leave.user);
  await new Email(employee, req.user).sendLeaveRejectionNotification(leave);
  
  res.status(200).json({
    status: 'success',
    data: leave,
  });
});

exports.getTeamCalendar = catchAsync(async (req, res, next) => {
  const { month, year } = req.query;
  
  // Get all users in the same department
  const users = await User.find({ department: req.user.department });
  
  // Get leaves for the specified month/year
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  const leaves = await Leave.find({
    user: { $in: users.map(u => u._id) },
    status: 'APPROVED',
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  }).select('user type startDate endDate');
  
  res.status(200).json({
    status: 'success',
    results: leaves.length,
    data: leaves,
  });
});