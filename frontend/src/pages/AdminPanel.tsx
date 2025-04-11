import { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../utils/config";
import { Blog, Score } from "../types/types"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]); // Type 'blogs' as an array of Blog
    const [scores, setScores] = useState<Score[]>([]); // Type 'scores' as an array of Score
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Use React Router's useNavigate

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [blogsRes, scoresRes] = await Promise.all([
                axios.get<Blog[]>(`${baseURL}/api/admin/blogs`, {
                    // Specify Blog[] type here
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }),
                axios.get<Score[]>(`${baseURL}/api/leaderboard`), // Specify Score[] type here
            ]);
            setBlogs(blogsRes.data);
            setScores(scoresRes.data);
        } catch (err) {
            setError("Admin access required");
        }
    };

    const deleteBlog = async (id: string) => {
        await axios.delete(`${baseURL}/api/admin/blogs/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        fetchData();
    };

    const deleteScore = async (id: string) => {
        await axios.delete(`${baseURL}/api/admin/leaderboard/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        fetchData();
    };

    if (error) {
        return (
            <Box p={4}>
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Heading mb={6}>Admin Dashboard</Heading>

            <Heading size="md" mb={4}>
                Blog Management
            </Heading>
            <Button mb={4} onClick={() => navigate("/admin/create-blog")}>
                Create New Blog
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {blogs.map((blog) => (
                        <Tr key={blog._id}>
                            <Td>{blog.title}</Td>
                            <Td>
                                <Button
                                    mr={2}
                                    onClick={() =>
                                        navigate(`/admin/edit-blog/${blog._id}`)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={() => deleteBlog(blog._id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Heading size="md" mt={8} mb={4}>
                Leaderboard Management
            </Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Player</Th>
                        <Th>Score</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {scores.map((score) => (
                        <Tr key={score._id}>
                            <Td>{score.playerName}</Td>
                            <Td>
                                {score.correctAnswers}/{score.incorrectAnswers}
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    onClick={() => deleteScore(score._id)}
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

export default AdminPanel;
