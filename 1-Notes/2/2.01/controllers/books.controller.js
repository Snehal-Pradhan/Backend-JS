// controllers/books.controller.js

import Book from '../models/Book.js'; // Import the Book model

// Controller function to get all books
export const getAllBooks = async (req, res) => {
    try {
        // Find all documents in the 'books' collection
        const books = await Book.find();
        // Send a 200 OK response with the fetched books as JSON
        res.status(200).json(books);
    } catch (error) {
        // Log the error message to the console for debugging
        console.error("Error fetching all books:", error.message);
        // Send a 500 Internal Server Error response with a generic message
        res.status(500).json({ message: 'Failed to retrieve books' });
    }
};

// Controller function to get a single book by its ID
export const getBookById = async (req, res) => {
    try {
        // Find a book by its ID from the request parameters
        const book = await Book.findById(req.params.id);
        // If no book is found, send a 404 Not Found response
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // If a book is found, send a 200 OK response with the book as JSON
        res.status(200).json(book);
    } catch (error) {
        // Log the error message to the console
        console.error("Error fetching book by ID:", error.message);
        // If the ID format is invalid (e.g., not a valid MongoDB ObjectId), it will throw a CastError.
        // In such cases, a 400 Bad Request is more appropriate than 500.
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Book ID format' });
        }
        // For other errors, send a 500 Internal Server Error
        res.status(500).json({ message: 'Failed to retrieve book' });
    }
};

// Controller function to create a new book
export const createBook = async (req, res) => {
    try {
        // Create a new book document using data from the request body
        const newBook = await Book.create(req.body);
        // Send a 201 Created response with the newly created book as JSON
        res.status(201).json(newBook);
    } catch (error) {
        // Log the error message to the console
        console.error("Error creating book:", error.message);
        // If there's a validation error (e.g., missing required fields), send a 400 Bad Request
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: `Validation failed: ${error.message}` });
        }
        // For other errors, send a 400 Bad Request with the specific error message
        res.status(400).json({ message: `Failed to create book: ${error.message}` });
    }
};

// Controller function to update an existing book
export const updateBook = async (req, res) => {
    try {
        // Find a book by ID and update it with the data from the request body.
        // `new: true` returns the updated document instead of the original.
        // `runValidators: true` runs schema validators on the update operation.
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // If no book is found with the given ID, send a 404 Not Found response
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found for update' });
        }
        // Send a 200 OK response with the updated book as JSON
        res.status(200).json(updatedBook);
    } catch (error) {
        // Log the error message to the console
        console.error("Error updating book:", error.message);
        // Handle CastError for invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Book ID format for update' });
        }
        // Handle ValidationError for schema validation issues during update
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: `Validation failed: ${error.message}` });
        }
        // For other errors, send a 400 Bad Request
        res.status(400).json({ message: `Failed to update book: ${error.message}` });
    }
};

// Controller function to delete a book
export const deleteBook = async (req, res) => {
    try {
        // Find a book by ID and delete it
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        // If no book is found with the given ID, send a 404 Not Found response
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found for deletion' });
        }
        // Send a 204 No Content response, indicating successful deletion with no body
        res.status(204).send();
    } catch (error) {
        // Log the error message to the console
        console.error("Error deleting book:", error.message);
        // Handle CastError for invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Book ID format for deletion' });
        }
        // For other errors, send a 500 Internal Server Error
        res.status(500).json({ message: `Failed to delete book: ${error.message}` });
    }
};
