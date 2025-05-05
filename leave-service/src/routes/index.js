const express = require('express');
const userRouter = require('./userRoutes');
const leaveRouter = require('./leaveRoutes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication and authorization
 *   - name: Users
 *     description: User management (admin only)
 *   - name: Leaves
 *     description: Leave management
 */

router.use('/users', userRouter);
router.use('/leaves', leaveRouter);

module.exports = router;