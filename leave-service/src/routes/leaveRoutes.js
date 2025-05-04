const express = require('express');
const leaveController = require('../controllers/leaveController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/balance', leaveController.getLeaveBalance);
router.get('/my-leaves', leaveController.getMyLeaves);
router.post('/apply', leaveController.applyForLeave);

// Only managers and admins can approve/reject leaves
router.use(authController.restrictTo('manager', 'admin'));

router.get('/approvals', leaveController.getLeavesToApprove);
router.patch('/approve/:id', leaveController.approveLeave);
router.patch('/reject/:id', leaveController.rejectLeave);
router.get('/team-calendar', leaveController.getTeamCalendar);

module.exports = router;