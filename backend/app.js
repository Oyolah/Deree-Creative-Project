const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./utils/errorHandler");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://one7roots-hbot.onrender.com",
        ],
        credentials: true,
    })
);
// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes")); // Add quiz routes
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); // Make sure this line exists

// Error Handler
app.use(errorHandler);

// Export the app
module.exports = app;
