require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
require('./config/database');

// Basic route
app.get('/', (req, res) => {
  res.send('Leave Management Service');
});

// Error handling middleware
app.use((err, req, res, next) => {
  winston.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Leave service running on port ${PORT}`);
});