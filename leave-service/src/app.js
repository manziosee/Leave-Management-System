const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Custom modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');
const router = require('./routes');

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Set security HTTP headers
app.use(helmet());

// Enable request logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit repeated requests to public APIs
const limiter = rateLimit({
  max: process.env.RATE_LIMIT_MAX || 100, // Default: 100 requests
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000, // Default: 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Parse incoming JSON and URL-encoded data
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse cookies
app.use(cookieParser());

// Sanitize data against NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Enable CORS
app.use(cors());
app.options('*', cors());

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

// Define application routes
app.use('/api/v1', router);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app for server.js to run
module.exports = app;
