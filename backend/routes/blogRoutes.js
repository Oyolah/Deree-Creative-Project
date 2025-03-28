const express = require("express");
const {
    createBlog,
    getBlogs,
    getBlogById,
    likeBlog,
    dislikeBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Protected routes (require authentication)
router.post(
    "/",
    protect, // Apply the protect middleware
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 },
        { name: "pdf", maxCount: 1 }, // Add PDF file upload
    ]),
    createBlog
);

// Like a blog
router.put("/:id/like", likeBlog);

// Dislike a blog
router.put("/:id/dislike", dislikeBlog);

module.exports = router;
