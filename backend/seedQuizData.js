// seedQuizData.js
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");

const quizData = [
    {
        question: "What does SDG stand for?",
        options: [
            "Sustainable Development Goals",
            "Social Development Goals",
            "Scientific Development Goals",
            "Systematic Development Goals",
        ],
        correctAnswer: "Sustainable Development Goals",
        category: "SDGs",
    },
    {
        question: "How many SDGs are there?",
        options: ["15", "17", "20", "10"],
        correctAnswer: "17",
        category: "SDGs",
    },
    {
        question: "Which SDG focuses on eliminating poverty?",
        options: ["SDG 1", "SDG 5", "SDG 10", "SDG 15"],
        correctAnswer: "SDG 1",
        category: "SDGs",
    },
    {
        question: "Which SDG is about Zero Hunger?",
        options: ["SDG 2", "SDG 3", "SDG 6", "SDG 12"],
        correctAnswer: "SDG 2",
        category: "SDGs",
    },
    {
        question: "What does SDG 3 focus on?",
        options: [
            "Clean Energy",
            "Quality Education",
            "Good Health and Well-being",
            "Climate Action",
        ],
        correctAnswer: "Good Health and Well-being",
        category: "SDGs",
    },
    {
        question: "Which SDG aims to achieve gender equality?",
        options: ["SDG 4", "SDG 5", "SDG 7", "SDG 12"],
        correctAnswer: "SDG 5",
        category: "SDGs",
    },
    {
        question: "Which SDG promotes clean water and sanitation?",
        options: ["SDG 4", "SDG 6", "SDG 8", "SDG 10"],
        correctAnswer: "SDG 6",
        category: "SDGs",
    },
    {
        question: "What is the main goal of SDG 7?",
        options: [
            "Sustainable Cities",
            "Affordable and Clean Energy",
            "Economic Growth",
            "Life Below Water",
        ],
        correctAnswer: "Affordable and Clean Energy",
        category: "SDGs",
    },
    {
        question: "Which SDG focuses on economic growth and decent work?",
        options: ["SDG 3", "SDG 8", "SDG 12", "SDG 16"],
        correctAnswer: "SDG 8",
        category: "SDGs",
    },
    {
        question: "Which SDG promotes innovation and infrastructure?",
        options: ["SDG 5", "SDG 9", "SDG 14", "SDG 17"],
        correctAnswer: "SDG 9",
        category: "SDGs",
    },
    {
        question: "Which SDG focuses on reducing inequalities?",
        options: ["SDG 7", "SDG 10", "SDG 13", "SDG 15"],
        correctAnswer: "SDG 10",
        category: "SDGs",
    },
    {
        question: "Which SDG aims to make cities more sustainable?",
        options: ["SDG 6", "SDG 11", "SDG 14", "SDG 17"],
        correctAnswer: "SDG 11",
        category: "SDGs",
    },
    {
        question: "What does SDG 12 focus on?",
        options: [
            "Clean Water",
            "Affordable Healthcare",
            "Responsible Consumption and Production",
            "Climate Change",
        ],
        correctAnswer: "Responsible Consumption and Production",
        category: "SDGs",
    },
    {
        question: "Which SDG is related to protecting marine life?",
        options: ["SDG 13", "SDG 14", "SDG 15", "SDG 16"],
        correctAnswer: "SDG 14",
        category: "SDGs",
    },
    {
        question: "Which SDG focuses on protecting forests and biodiversity?",
        options: ["SDG 5", "SDG 9", "SDG 15", "SDG 17"],
        correctAnswer: "SDG 15",
        category: "SDGs",
    },
    {
        question: "What does SDG 16 promote?",
        options: [
            "Peace, Justice, and Strong Institutions",
            "Economic Growth",
            "Gender Equality",
            "Innovation",
        ],
        correctAnswer: "Peace, Justice, and Strong Institutions",
        category: "SDGs",
    },
    {
        question: "What is the main focus of SDG 17?",
        options: [
            "Global Partnerships",
            "Affordable Housing",
            "Industrial Growth",
            "Marine Life",
        ],
        correctAnswer: "Global Partnerships",
        category: "SDGs",
    },
    {
        question: "What is a major challenge in achieving the SDGs?",
        options: [
            "Lack of Awareness",
            "Climate Change",
            "Economic Inequality",
            "All of the above",
        ],
        correctAnswer: "All of the above",
        category: "SDGs",
    },
    {
        question: "Which SDG aims to combat climate change?",
        options: ["SDG 10", "SDG 12", "SDG 13", "SDG 16"],
        correctAnswer: "SDG 13",
        category: "SDGs",
    },
    {
        question: "Which SDG focuses on improving education worldwide?",
        options: ["SDG 1", "SDG 4", "SDG 8", "SDG 14"],
        correctAnswer: "SDG 4",
        category: "SDGs",
    },
    {
        question: "Which of the following is NOT an SDG?",
        options: [
            "Life on Land",
            "Zero Hunger",
            "Space Exploration",
            "Gender Equality",
        ],
        correctAnswer: "Space Exploration",
        category: "SDGs",
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Clear existing data
        await Quiz.deleteMany({});
        console.log("Cleared existing quiz data");

        // Insert new data
        await Quiz.insertMany(quizData);
        console.log("Quiz data seeded successfully");

        // Close the connection
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Failed to seed quiz data:", error);
    }
};

seedDatabase();
