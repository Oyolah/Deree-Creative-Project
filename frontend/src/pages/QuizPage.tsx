import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Progress,
    Heading,
    useToast,
    Input,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "../components/Layout";
import { Quiz } from "../types/types"; // Import the Quiz type
import { baseURL } from "../utils/config";

const QuizPage = () => {
    // Type the quizzes state as an array of Quiz objects
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
    const [playerName, setPlayerName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false); // Track if an answer is selected
    const toast = useToast();

    useEffect(() => {
        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && gameStarted) {
            handleNextQuestion(); // Automatically move to the next question when time runs out
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer); // Cleanup timer
    }, [timeLeft, gameStarted]);

    // Submit score to leaderboard when showResult is true
    useEffect(() => {
        if (showResult) {
            const submitScore = async () => {
                try {
                    await axios.post(`${baseURL}/api/leaderboard/submit`, {
                        playerName,
                        correctAnswers: score.correct,
                        incorrectAnswers: score.incorrect,
                    });
                } catch (error) {
                    console.error("Failed to submit score:", error);
                }
            };
            submitScore();
        }
    }, [showResult]); // Dependency on showResult

    const fetchQuizzes = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/quiz`);
            setQuizzes(res.data);
        } catch (error) {
            toast({
                title: "Failed to fetch quizzes",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAnswerSelection = (answer: string) => {
        if (!isAnswerSelected) {
            setSelectedAnswer(answer);
            setIsAnswerSelected(true);

            const isCorrect = quizzes[currentQuestion].correctAnswer === answer;
            setScore((prev) => ({
                correct: prev.correct + (isCorrect ? 1 : 0),
                incorrect: prev.incorrect + (isCorrect ? 0 : 1),
            }));
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < quizzes.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer("");
            setIsAnswerSelected(false);
            setTimeLeft(10); // Reset timer for the next question
        } else {
            setShowResult(true);
        }
    };

    const handleEndGame = () => {
        setShowResult(true);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setScore({ correct: 0, incorrect: 0 });
        setShowResult(false);
        setTimeLeft(10);
        setIsAnswerSelected(false);
    };
    if (!gameStarted) {
        return (
            <Layout>
                <Box maxW="lg" mx="auto" mt={10}>
                    <Box
                        bg="white"
                        p={6}
                        rounded="2xl"
                        shadow="lg"
                        textAlign="center"
                    >
                        <Text fontSize="xl" mb={4}>
                            Enter your name to start the quiz:
                        </Text>
                        <Input
                            placeholder="Your Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            mb={4}
                        />
                        <Button
                            colorScheme="teal"
                            onClick={() => setGameStarted(true)}
                            isDisabled={!playerName}
                            width="full"
                        >
                            Start Quiz
                        </Button>
                    </Box>
                </Box>
            </Layout>
        );
    }

    if (showResult) {
        const totalQuestions = quizzes.length;
        const correctAnswers = score.correct;

        return (
            <Layout>
                <Box maxW="lg" mx="auto" mt={10}>
                    <Box
                        bg="white"
                        p={6}
                        rounded="2xl"
                        shadow="lg"
                        textAlign="center"
                    >
                        <Heading size="lg" mb={4}>
                            Quiz Result
                        </Heading>
                        <Text fontSize="lg">
                            Correct Answers: {correctAnswers}/{totalQuestions}
                        </Text>
                        <Text fontSize="lg" mb={4}>
                            Incorrect Answers: {score.incorrect}
                        </Text>
                        <Button colorScheme="teal" onClick={handleRestart}>
                            Restart Quiz
                        </Button>
                    </Box>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box maxW="lg" mx="auto" mt={10}>
                <Box bg="white" p={6} rounded="2xl" shadow="lg">
                    <Text fontSize="md" mb={2} textAlign="right">
                        Time Left: <strong>{timeLeft}</strong> seconds
                    </Text>
                    <Progress
                        value={((currentQuestion + 1) / quizzes.length) * 100}
                        size="sm"
                        mb={4}
                        borderRadius="md"
                        hasStripe
                        isAnimated
                    />
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        {quizzes[currentQuestion]?.question}
                    </Text>

                    <RadioGroup
                        value={selectedAnswer}
                        onChange={handleAnswerSelection}
                    >
                        <Stack spacing={3}>
                            {quizzes[currentQuestion]?.options.map(
                                (option, index) => {
                                    const isCorrect =
                                        option ===
                                        quizzes[currentQuestion].correctAnswer;
                                    const isSelected =
                                        option === selectedAnswer;
                                    const isWrong =
                                        isAnswerSelected &&
                                        isSelected &&
                                        !isCorrect;

                                    return (
                                        <Flex
                                            key={index}
                                            align="center"
                                            bg={
                                                isAnswerSelected
                                                    ? isCorrect
                                                        ? "green.50"
                                                        : isWrong
                                                        ? "red.50"
                                                        : "gray.50"
                                                    : "gray.50"
                                            }
                                            borderLeft="8px solid"
                                            borderColor={
                                                isAnswerSelected
                                                    ? isCorrect
                                                        ? "green.500"
                                                        : isWrong
                                                        ? "red.500"
                                                        : "gray.300"
                                                    : "gray.300"
                                            }
                                            px={4}
                                            py={2}
                                            rounded="md"
                                        >
                                            <Radio
                                                value={option}
                                                isDisabled={isAnswerSelected}
                                                width="full"
                                            >
                                                {option}
                                            </Radio>
                                        </Flex>
                                    );
                                }
                            )}
                        </Stack>
                    </RadioGroup>

                    <Flex justify="space-between" mt={6}>
                        <Button
                            colorScheme="teal"
                            onClick={handleNextQuestion}
                            isDisabled={!isAnswerSelected}
                        >
                            {currentQuestion < quizzes.length - 1
                                ? "Next"
                                : "Finish"}
                        </Button>
                        <Button colorScheme="red" onClick={handleEndGame}>
                            End Game
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Layout>
    );
};

export default QuizPage;
