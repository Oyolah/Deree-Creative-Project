const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        video: {
            type: String,
            default: "",
        },
        pdf: {
            type: String,
            default: "",
        },
        tags: [
            {
                type: String,
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
