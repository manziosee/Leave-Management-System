/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - passwordConfirm
 *         - department
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *           example: 60f7a9b9e6b9a71f9c9f3f3f
 *         name:
 *           type: string
 *           description: The user's full name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: john@example.com
 *         photo:
 *           type: string
 *           description: URL to user's profile photo
 *           example: https://example.com/photos/john.jpg
 *         role:
 *           type: string
 *           enum: [staff, manager, admin]
 *           default: staff
 *           description: User's role in the system
 *           example: manager
 *         department:
 *           type: string
 *           description: Department the user belongs to
 *           example: Engineering
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: Hashed password (not returned in responses)
 *         passwordConfirm:
 *           type: string
 *           format: password
 *           description: Password confirmation (not persisted)
 *         passwordChangedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last password change
 *         active:
 *           type: boolean
 *           default: true
 *           description: Whether the user account is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when user was created
 *           example: 2023-07-20T10:00:00.000Z
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['staff', 'manager', 'admin'],
    default: 'staff',
  },
  department: {
    type: String,
    required: [true, 'Please specify department'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;