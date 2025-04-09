// src/components/admin/AdminLeaderboardPanel.tsx
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Score } from "../../types/types";
import { deleteLeaderboardEntry } from "../../services/adminService";
import api from "../../utils/api";

const AdminLeaderboardPanel = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const loadScores = async () => {
            try {
                const response = await api.get<Score[]>("/leaderboard");
                setScores(response.data);
            } catch (error) {
                toast({
                    title: "Failed to load leaderboard",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        loadScores();
    }, []);

    const handleDelete = async (scoreId: string) => {
        try {
            await deleteLeaderboardEntry(scoreId);
            setScores(scores.filter((score) => score._id !== scoreId));
            toast({
                title: "Entry deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to delete entry",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Box>Loading leaderboard...</Box>;

    return (
        <Box overflowX="auto">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Player</Th>
                        <Th>Correct</Th>
                        <Th>Incorrect</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {scores.map((score) => (
                        <Tr key={score._id}>
                            <Td>{score.playerName}</Td>
                            <Td>{score.correctAnswers}</Td>
                            <Td>{score.incorrectAnswers}</Td>
                            <Td>
                                {score.date
                                    ? new Date(score.date).toLocaleDateString()
                                    : "N/A"}
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(score._id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default AdminLeaderboardPanel;
