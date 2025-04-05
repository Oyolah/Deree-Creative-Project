// controllers/adminController.js
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Score = require("../models/Score");
const { ErrorHandler } = require("../utils/errorHandler");

// Controller functions
const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) throw new ErrorHandler(404, "Blog not found");
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) throw new ErrorHandler(404, "Comment not found");
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteLeaderboardEntry = async (req, res, next) => {
    try {
        const entry = await Score.findByIdAndDelete(req.params.id);
        if (!entry) throw new ErrorHandler(404, "Leaderboard entry not found");
        res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw new ErrorHandler(404, "User not found");
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get all comments
const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find()
            .populate("user", "name email")
            .populate("blog", "title");
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

// Export as named exports
module.exports = {
    deleteBlog,
    deleteComment,
    deleteLeaderboardEntry,
    deleteUser,
    getAllUsers,
    getAllComments,
};
