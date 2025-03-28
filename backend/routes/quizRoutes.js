// routes/quizRoutes.js
const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();

// Fetch all quiz questions
router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find({ category: "SDGs" });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch quizzes", error });
    }
});

// Submit quiz answers and calculate score
router.post("/submit", async (req, res) => {
    const { answers } = req.body; // Array of { questionId, selectedAnswer }
    try {
        const quizzes = await Quiz.find({
            _id: { $in: answers.map((a) => a.questionId) },
        });
        let correct = 0;

        answers.forEach((answer) => {
            const quiz = quizzes.find(
                (q) => q._id.toString() === answer.questionId
            );
            if (quiz && quiz.correctAnswer === answer.selectedAnswer) {
                correct++;
            }
        });

        const total = quizzes.length;
        const score = (correct / total) * 100;
        const result = score > 50 ? "Win" : "Lose";

        res.status(200).json({
            correct,
            incorrect: total - correct,
            score,
            result,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit quiz", error });
    }
});

module.exports = router;
