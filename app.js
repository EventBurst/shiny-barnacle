// Import the Express.js library
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route that responds with "Hello, World!" when accessed
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Test Api
app.get('/test', (req, res) => {
  res.send('Test');
});
// Export the Express app instance
module.exports = app;
