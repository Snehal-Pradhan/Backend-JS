// models/Book.js

import mongoose from 'mongoose'; // Import the Mongoose library

// Define the schema for the Book model
// This outlines the structure and data types for documents in the 'books' collection
const bookSchema = new mongoose.Schema({
    // 'title' field: required, of type String, trimmed to remove leading/trailing whitespace
    title: {
        type: String,
        required: true, // Title is a mandatory field
        trim: true // Removes whitespace from both ends of a string
    },
    // 'author' field: required, of type String, trimmed
    author: {
        type: String,
        required: true, // Author is a mandatory field
        trim: true
    },
    // 'publishedYear' field: required, of type Number, with min/max validation
    publishedYear: {
        type: Number,
        required: true, // Published year is a mandatory field
        min: 1000, // Minimum publication year allowed (e.g., historical books)
        max: new Date().getFullYear() + 5 // Maximum publication year (allowing for future publications, e.g., pre-orders)
    },
}, {
    // Schema options:
    // 'timestamps: true' automatically adds 'createdAt' and 'updatedAt' fields to the schema.
    // 'createdAt' will store the date a document was created.
    // 'updatedAt' will store the date a document was last updated.
    timestamps: true
});

// Create the Mongoose model from the schema
// 'Book' is the name of the model. Mongoose will automatically create a collection
// named 'books' (lowercase and pluralized) in your MongoDB database.
// 'bookSchema' is the schema definition that this model uses.
const Book = mongoose.model('Book', bookSchema);

// Export the Book model as the default export.
// This allows other files (like your controllers) to import and use the Book model
// using `import Book from '../models/Book.js';`
export default Book;
