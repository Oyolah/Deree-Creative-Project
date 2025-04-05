// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
    deleteBlog,
    deleteComment,
    deleteLeaderboardEntry,
    deleteUser,
    getAllUsers,
    getAllComments,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

// Admin routes
router.delete("/blogs/:id", protect, adminMiddleware, deleteBlog);
router.delete("/comments/:id", protect, adminMiddleware, deleteComment);
router.delete(
    "/leaderboard/:id",
    protect,
    adminMiddleware,
    deleteLeaderboardEntry
);
router.delete("/users/:id", protect, adminMiddleware, deleteUser);
router.get("/users", protect, adminMiddleware, getAllUsers);
// adminRoutes.js
router.get("/comments", protect, adminMiddleware, getAllComments);

module.exports = router;
