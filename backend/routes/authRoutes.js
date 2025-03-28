const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logoutUser);

module.exports = router;
