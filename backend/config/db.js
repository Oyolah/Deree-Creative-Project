// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import mongoose
const mongoose = require("mongoose");

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connectDB function
module.exports = connectDB;
