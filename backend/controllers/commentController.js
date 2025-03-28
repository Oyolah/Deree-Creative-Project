const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Public
const createComment = async (req, res) => {
    const { blogId, text, username } = req.body;

    // Validate required fields
    if (!blogId || !text) {
        return res
            .status(400)
            .json({ message: "Blog ID and text are required" });
    }

    try {
        // Create a new comment
        const comment = new Comment({
            blog: blogId,
            user: username || "Anonymous", // Use "Anonymous" if no username is provided
            text,
        });

        await comment.save();

        // Add comment to the blog
        const blog = await Blog.findById(blogId);
        if (blog) {
            blog.comments.push(comment._id);
            await blog.save();
        }

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get comments for a blog
// @route   GET /api/comments/:blogId
// @access  Public
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            blog: req.params.blogId,
        }).sort({ createdAt: -1 }); // Sort comments by newest first
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createComment, getComments };
