/**
 * @swagger
 * components:
 *   schemas:
 *     Leave:
 *       type: object
 *       required:
 *         - user
 *         - type
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the leave
 *           example: 60f7a9b9e6b9a71f9c9f3f3f
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user who applied for leave
 *         type:
 *           type: string
 *           enum: [PTO, SICK, COMPASSIONATE, MATERNITY, UNPAID]
 *           description: Type of leave
 *           example: PTO
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of leave
 *           example: 2023-07-15
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of leave
 *           example: 2023-07-20
 *         reason:
 *           type: string
 *           description: Reason for leave (required for some types)
 *           example: Family vacation
 *         document:
 *           type: string
 *           format: uri
 *           description: URL to supporting document
 *           example: https://example.com/medical-certificate.pdf
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           default: PENDING
 *           description: Status of the leave request
 *           example: APPROVED
 *         approvedBy:
 *           $ref: '#/components/schemas/User'
 *           description: User who approved/rejected the leave
 *         comments:
 *           type: string
 *           description: Comments from approver
 *           example: Approved for family vacation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the leave was created
 *           example: 2023-07-01T10:00:00.000Z
 *         days:
 *           type: number
 *           description: Calculated number of leave days (virtual property)
 *           example: 6
 */
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