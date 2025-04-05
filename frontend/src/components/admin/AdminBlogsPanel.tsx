// src/components/admin/AdminBlogsPanel.tsx
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
import { Blog } from "../../types/types";
import { deleteBlog } from "../../services/adminService";
import api from "../../utils/api";

const AdminBlogsPanel = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await api.get<Blog[]>("/blogs");
                setBlogs(response.data);
            } catch (error) {
                toast({
                    title: "Failed to load blogs",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    const handleDelete = async (blogId: string) => {
        try {
            await deleteBlog(blogId);
            setBlogs(blogs.filter((blog) => blog._id !== blogId));
            toast({
                title: "Blog deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to delete blog",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Box>Loading blogs...</Box>;

    return (
        <Box overflowX="auto">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {blogs.map((blog) => (
                        <Tr key={blog._id}>
                            <Td>{blog.title}</Td>
                            <Td>{blog.author?.name || "Unknown"}</Td>
                            <Td>
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(blog._id)}
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

export default AdminBlogsPanel;
