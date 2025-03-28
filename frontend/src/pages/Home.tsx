import { Box, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Blog } from "../types/types";
import BlogCard from "../components/BlogCard";
import SDGVisualization from "../components/SDGVisualization";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get<Blog[]>("/api/blogs");
                setBlogs(res.data);
            } catch (error) {
                setError("Failed to fetch blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    // Handle blog update after like/dislike
    const handleBlogUpdate = (
        blogId: string,
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog._id === blogId
                    ? {
                          ...blog,
                          likes: updatedLikes,
                          dislikes: updatedDislikes,
                      }
                    : blog
            )
        );
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                Loading...
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={10} color="red.500">
                {error}
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Welcome to the Creative Project Blog
            </Heading>
            <SDGVisualization />

            <VStack spacing={4} align="stretch">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                        onUpdate={handleBlogUpdate}
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default Home;
