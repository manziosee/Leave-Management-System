const express = require('express');
const userRouter = require('./userRoutes');
const leaveRouter = require('./leaveRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/leaves', leaveRouter);

module.exports = router;