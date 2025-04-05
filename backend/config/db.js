// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import mongoose
const mongoose = require("mongoose");

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true, // Ensure this is true
        });
        console.log("MongoDB Connected...");

        // Optional: Rebuild indexes
        await mongoose.model("User").syncIndexes();
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

// Export the connectDB function
module.exports = connectDB;
