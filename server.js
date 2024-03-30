// Import the Express app from app.js
const app = require('./app');

// Define the port number
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
