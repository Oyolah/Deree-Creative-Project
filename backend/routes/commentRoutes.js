const express = require("express");
const {
    createComment,
    getComments,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/", createComment); // Allow anyone to comment
router.get("/:blogId", getComments); // Allow anyone to view comments
router.get("/", protect, getComments); // This handles GET /api/comments

module.exports = router;
