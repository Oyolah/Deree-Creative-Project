// routes/leaderboardRoutes.js
const express = require("express");
const Score = require("../models/Score");
const router = express.Router();

// Submit score
router.post("/submit", async (req, res) => {
    const { playerName, correctAnswers, incorrectAnswers } = req.body;
    try {
        const newScore = new Score({
            playerName,
            correctAnswers,
            incorrectAnswers,
        });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: "Failed to submit score", error });
    }
});

// Fetch leaderboard
router.get("/", async (req, res) => {
    try {
        const leaderboard = await Score.find()
            .sort({ correctAnswers: -1 })
            .limit(10); // Top 10 scores
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leaderboard", error });
    }
});

module.exports = router;
