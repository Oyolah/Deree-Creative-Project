const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
