const Blog = require("../models/Blog");
// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
    const { title, content, tags } = req.body;

    // Validate required fields
    if (!title || !content) {
        return res
            .status(400)
            .json({ message: "Title and content are required" });
    }

    try {
        // Create a new blog
        const blog = new Blog({
            title,
            content,
            author: req.user.id, // Attach the authenticated user's ID
            tags: tags ? JSON.parse(tags) : [], // Parse tags if provided
            image: req.files?.image ? req.files.image[0].path : "", // Handle image upload
            video: req.files?.video ? req.files.video[0].path : "", // Handle video upload
            pdf: req.files?.pdf ? req.files.pdf[0].path : "", // Handle PDF upload
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Server error during blog creation" });
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name avatar")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name avatar",
                },
            });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get a single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "name avatar") // Populate the author's name and avatar
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name avatar", // Populate the commenter's name and avatar
                },
            });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Like or unlike a blog
// @route   PUT /api/blogs/:id/like
// @access  Public
const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Get the user identifier (authenticated user ID or anonymous IP)
        const userIdentifier = req.user?.id || `Anonymous-${req.ip}`;

        // Check if the user already liked the blog
        const userLikedIndex = blog.likes.findIndex(
            (like) => like.toString() === userIdentifier.toString()
        );

        if (userLikedIndex !== -1) {
            // User already liked the blog, so unlike it
            blog.likes.splice(userLikedIndex, 1);
        } else {
            // User hasn't liked the blog, so like it
            blog.likes.push(userIdentifier);

            // Remove the user from dislikes (if present)
            const userDislikedIndex = blog.dislikes.findIndex(
                (dislike) => dislike.toString() === userIdentifier.toString()
            );
            if (userDislikedIndex !== -1) {
                blog.dislikes.splice(userDislikedIndex, 1);
            }
        }

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Dislike or undislike a blog
// @route   PUT /api/blogs/:id/dislike
// @access  Public
const dislikeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Get the user identifier (authenticated user ID or anonymous IP)
        const userIdentifier = req.user?.id || `Anonymous-${req.ip}`;

        // Check if the user already disliked the blog
        const userDislikedIndex = blog.dislikes.findIndex(
            (dislike) => dislike.toString() === userIdentifier.toString()
        );

        if (userDislikedIndex !== -1) {
            // User already disliked the blog, so undislike it
            blog.dislikes.splice(userDislikedIndex, 1);
        } else {
            // User hasn't disliked the blog, so dislike it
            blog.dislikes.push(userIdentifier);

            // Remove the user from likes (if present)
            const userLikedIndex = blog.likes.findIndex(
                (like) => like.toString() === userIdentifier.toString()
            );
            if (userLikedIndex !== -1) {
                blog.likes.splice(userLikedIndex, 1);
            }
        }

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error toggling dislike:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createBlog, getBlogs, getBlogById, likeBlog, dislikeBlog };
