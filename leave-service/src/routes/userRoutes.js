const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/me', userController.getMe);
router.patch('/updateMyPassword', userController.updateMyPassword);

// Only admins can access these routes
router.use(authController.restrictTo('admin'));

// Admin routes for user management would go here

module.exports = router;