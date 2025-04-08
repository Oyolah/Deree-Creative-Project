// pages/Home.tsx
import { Box, Heading, VStack, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Blog } from "../types/types";
import BlogCard from "../components/BlogCard";
import SDGVisualization from "../components/SDGVisualization";
import api from "../utils/api";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs using the configured api instance
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get<Blog[]>("/blogs");
                setBlogs(res.data);
            } catch (error) {
                setError("Failed to fetch blogs. Please try again later.");
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

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
            <Box p={4}>
                <Heading as="h1" size="xl" mb={4}>
                    Welcome to the Creative Project Blog
                </Heading>
                <VStack spacing={4} align="stretch">
                    {[...Array(3)].map((_, i) => (
                        <Box key={i} borderWidth="1px" borderRadius="lg" p={4}>
                            <Skeleton height="20px" mb={4} />
                            <SkeletonText noOfLines={3} spacing="3" />
                        </Box>
                    ))}
                </VStack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
                <Heading as="h1" size="xl" mb={4}>
                    Welcome to the Creative Project Blog
                </Heading>
                <Box textAlign="center" mt={10} color="red.500">
                    {error}
                </Box>
            </Box>
        );
    }

    // In your return statement, replace the VStack with this:
    return (
        <Box p={4} pt="80px">
            <Heading as="h1" size="xl" mb={4}>
                Welcome to the Creative Project Blog
            </Heading>
            <SDGVisualization />
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(600px, 1fr))"
                gap={6}
                mt={6}
            >
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                        onUpdate={handleBlogUpdate}
                    />
                ))}
            </Box>
        </Box>
    );

    // return (
    //     <Box p={4} pt="80px">
    //         {" "}
    //         {/* Added padding top to account for fixed header */}
    //         <Heading as="h1" size="xl" mb={4}>
    //             Welcome to the Creative Project Blog
    //         </Heading>
    //         <SDGVisualization />
    //         <VStack spacing={4} align="stretch">
    //             {blogs.map((blog) => (
    //                 <BlogCard
    //                     key={blog._id}
    //                     blog={blog}
    //                     onUpdate={handleBlogUpdate}
    //                 />
    //             ))}
    //         </VStack>
    //     </Box>
    // );
};

export default Home;
