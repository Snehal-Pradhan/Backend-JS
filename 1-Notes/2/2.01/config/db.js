// config/db.js

import mongoose from 'mongoose'; // Import the Mongoose library

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Get the MongoDB connection URI from environment variables.
        // It's crucial to use environment variables for sensitive data like database URIs.
        // If not set, it defaults to a local MongoDB instance.
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore_db';

        // Connect to MongoDB using Mongoose.
        // The options ensure a stable and robust connection.
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,      // Deprecated in recent Mongoose versions, but harmless to include.
                                        // Ensures the new URL parser is used.
            useUnifiedTopology: true    // Deprecated in recent Mongoose versions, but harmless to include.
                                        // Ensures the new Server Discovery and Monitoring engine is used.
            // useCreateIndex: true,    // Deprecated. Only needed for creating indexes.
            // useFindAndModify: false  // Deprecated. Set to false to use native findOneAndUpdate().
        });

        console.log('MongoDB connected successfully!'); // Log success message
    } catch (error) {
        // Log any connection errors
        console.error('MongoDB connection error:', error.message);
        // Exit the process with a failure code if the database connection fails.
        // This is important because the application cannot function without a database.
        process.exit(1);
    }
};

export default connectDB; // Export the connection function to be used in index.js