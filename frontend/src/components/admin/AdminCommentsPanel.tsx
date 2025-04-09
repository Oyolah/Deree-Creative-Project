// export default AdminCommentsPanel;
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
import { Comment } from "../../types/types";
import { deleteComment } from "../../services/adminService";
import api from "../../utils/api";

const AdminCommentsPanel = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await api.get<Comment[]>("/admin/comments");
                setComments(response.data);
            } catch (error) {
                toast({
                    title: "Failed to load comments",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        loadComments();
    }, []);

    const handleDelete = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            setComments(
                comments.filter((comment) => comment._id !== commentId)
            );
            toast({
                title: "Comment deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to delete comment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Box>Loading comments...</Box>;

    return (
        <Box overflowX="auto">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Content</Th>
                        <Th>Author</Th>
                        <Th>Blog</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {comments.map((comment) => (
                        <Tr key={comment._id}>
                            <Td>{comment.text}</Td>
                            <Td>
                                {typeof comment.user === "string"
                                    ? comment.user
                                    : comment.user?.name || "Anonymous"}
                            </Td>
                            <Td>
                                {typeof comment.blog === "string"
                                    ? comment.blog
                                    : comment.blog?.title || "Unknown Blog"}
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(comment._id)}
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

export default AdminCommentsPanel;
