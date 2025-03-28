// models/Score.js
const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    incorrectAnswers: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Score", scoreSchema);
