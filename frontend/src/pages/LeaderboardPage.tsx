import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../utils/config";
import Layout from "../components/Layout";
import { LeaderboardEntry } from "../types/types"; // Import the type

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/leaderboard`);
            setLeaderboard(res.data);
        } catch (error) {
            console.error("Failed to fetch leaderboard:", error);
        }
    };

    return (
        <Layout>
            <Box textAlign="center" mt={10}>
                <Heading mb={6}>Leaderboard</Heading>
                <Box
                    maxW="8xl"
                    mx="auto"
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    boxShadow="lg"
                    overflowX="auto"
                >
                    <Table variant="simple">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Player Name</Th>
                                <Th>Correct Answers</Th>
                                <Th>Incorrect Answers</Th>
                                <Th>Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {leaderboard.map((entry, index) => (
                                <Tr key={index}>
                                    <Td>{entry.playerName}</Td>
                                    <Td>{entry.correctAnswers}</Td>
                                    <Td>{entry.incorrectAnswers}</Td>
                                    <Td>
                                        {new Date(
                                            entry.date
                                        ).toLocaleDateString()}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                <Button
                    mt={6}
                    colorScheme="teal"
                    onClick={() => (window.location.href = "/quiz")}
                >
                    Play Again
                </Button>
            </Box>
        </Layout>
    );
};

export default LeaderboardPage;
