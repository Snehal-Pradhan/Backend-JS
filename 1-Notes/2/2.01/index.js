// index.js

import express from 'express'; // Import the Express framework
import connectDB from './config/db.js'; // Import the database connection function
import bookRoutes from './routes/books.route.js'; // Import the book routes

// Optional: Import dotenv for loading environment variables from a .env file
// If you're using this, make sure to install it: npm install dotenv
// import dotenv from 'dotenv';
// dotenv.config();

const app = express(); // Create an Express application instance

// Connect to the database
connectDB();

// Middleware to parse JSON request bodies
// This allows your application to handle JSON data sent in POST and PUT requests.
app.use(express.json());

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Book API! Use /api/books to access book data.');
});

// Mount the book routes
// All routes defined in bookRoutes will be prefixed with '/api/books'.
// For example, GET /api/books will fetch all books, POST /api/books will create a book.
app.use('/api/books', bookRoutes);

// Define the port the server will listen on.
// It tries to use the PORT environment variable, otherwise defaults to 3000.
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}/api/books`);
});
