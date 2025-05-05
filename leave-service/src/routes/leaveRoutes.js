const express = require('express');
const leaveController = require('../controllers/leaveController');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leave management endpoints
 */

// Protect all routes after this middleware
router.use(userController.protect); // Make sure protect is a middleware in userController

/**
 * @swagger
 * /leaves/balance:
 *   get:
 *     summary: Get current user's leave balance
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     PTO:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 20
 *                         used:
 *                           type: number
 *                           example: 5
 *                         pending:
 *                           type: number
 *                           example: 2
 *                         remaining:
 *                           type: number
 *                           example: 13
 *                     SICK:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 10
 *                         used:
 *                           type: number
 *                           example: 1
 *                         pending:
 *                           type: number
 *                           example: 0
 *                         remaining:
 *                           type: number
 *                           example: 9
 *                     COMPASSIONATE:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 5
 *                         used:
 *                           type: number
 *                           example: 0
 *                         pending:
 *                           type: number
 *                           example: 0
 *                         remaining:
 *                           type: number
 *                           example: 5
 *                     MATERNITY:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 90
 *                         used:
 *                           type: number
 *                           example: 0
 *                         pending:
 *                           type: number
 *                           example: 0
 *                         remaining:
 *                           type: number
 *                           example: 90
 *                     UNPAID:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 0
 *                         used:
 *                           type: number
 *                           example: 0
 *                         pending:
 *                           type: number
 *                           example: 0
 *                         remaining:
 *                           type: number
 *                           example: 0
 *       401:
 *         description: Unauthorized
 */
router.get('/balance', leaveController.getLeaveBalance);

/**
 * @swagger
 * /leaves/my-leaves:
 *   get:
 *     summary: Get all leaves for current user
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         description: Filter by leave status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [PTO, SICK, COMPASSIONATE, MATERNITY, UNPAID]
 *         description: Filter by leave type
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: Filter by year
 *     responses:
 *       200:
 *         description: List of leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Leave'
 *       401:
 *         description: Unauthorized
 */
router.get('/my-leaves', leaveController.getMyLeaves);

/**
 * @swagger
 * /leaves/apply:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - startDate
 *               - endDate
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [PTO, SICK, COMPASSIONATE, MATERNITY, UNPAID]
 *                 example: PTO
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-07-15
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-07-20
 *               reason:
 *                 type: string
 *                 example: Family vacation
 *                 description: Required for SICK and COMPASSIONATE leave types
 *               document:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/medical-certificate.pdf
 *                 description: URL to supporting document
 *     responses:
 *       201:
 *         description: Leave application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Invalid input or insufficient leave balance
 *       401:
 *         description: Unauthorized
 */
router.post('/apply', leaveController.applyForLeave);

// Only managers and admins can approve/reject leaves
router.use(userController.restrictTo('manager', 'admin'));

/**
 * @swagger
 * /leaves/approvals:
 *   get:
 *     summary: Get leaves pending approval (for managers/admins)
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department (admin only)
 *     responses:
 *       200:
 *         description: List of leaves pending approval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Leave'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a manager/admin)
 */
router.get('/approvals', leaveController.getLeavesToApprove);

/**
 * @swagger
 * /leaves/approve/{id}:
 *   patch:
 *     summary: Approve a leave request (for managers/admins)
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Leave ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comments:
 *                 type: string
 *                 example: Enjoy your vacation!
 *     responses:
 *       200:
 *         description: Leave approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a manager/admin)
 *       404:
 *         description: Leave not found
 */
router.patch('/approve/:id', leaveController.approveLeave);

/**
 * @swagger
 * /leaves/reject/{id}:
 *   patch:
 *     summary: Reject a leave request (for managers/admins)
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Leave ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comments
 *             properties:
 *               comments:
 *                 type: string
 *                 example: Rejected due to project deadline
 *     responses:
 *       200:
 *         description: Leave rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a manager/admin)
 *       404:
 *         description: Leave not found
 */
router.patch('/reject/:id', leaveController.rejectLeave);

/**
 * @swagger
 * /leaves/team-calendar:
 *   get:
 *     summary: Get team calendar (for managers/admins)
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department (admin only)
 *     responses:
 *       200:
 *         description: Team calendar data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Invalid month/year parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a manager/admin)
 */
router.get('/team-calendar', leaveController.getTeamCalendar);

module.exports = router;
