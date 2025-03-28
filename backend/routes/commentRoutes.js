const express = require("express");
const {
    createComment,
    getComments,
} = require("../controllers/commentController");

const router = express.Router();

// Public routes
router.post("/", createComment); // Allow anyone to comment
router.get("/:blogId", getComments); // Allow anyone to view comments

module.exports = router;
