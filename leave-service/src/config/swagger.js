const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./'); // This loads config/index.js correctly

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Leave Management System API',
      version: '1.0.0',
      description: 'API documentation for the Leave Management System',
      contact: {
        name: 'API Support',
        email: 'support@leavemanagement.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Adjust if using .ts or other folders
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
