// models/User.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true, // Explicitly declare index
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

// Add this to ensure only defined indexes exist
userSchema.indexes = function () {
    return [
        [{ email: 1 }, { unique: true }], // Only keep this index
    ];
};

module.exports = mongoose.model("User", userSchema);
