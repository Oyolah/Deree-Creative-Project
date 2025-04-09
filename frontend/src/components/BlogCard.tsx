import {
    Box,
    Heading,
    Text,
    Avatar,
    Flex,
    Link,
    Image,
    Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { Blog } from "../types/types";
import { baseURL } from "../utils/config";

interface BlogCardProps {
    blog: Blog;
    onUpdate: (
        blogId: string,
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => void;
}

const BlogCard = ({ blog, onUpdate }: BlogCardProps) => {
    const handleBlogUpdate = (
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => {
        onUpdate(blog._id, updatedLikes, updatedDislikes);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
            display="flex"
            flexDirection="column"
            alignSelf="start" // 👈 prevents stretching to max height in grid
        >
            {/* Media Section */}
            {blog.image && (
                <Image
                    src={`${baseURL}${blog.image}`}
                    alt={blog.title}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                />
            )}
            {blog.video && (
                <Box
                    as="video"
                    controls
                    width="100%"
                    height="400px"
                    objectFit="cover"
                    borderTop="1px solid #e2e8f0"
                    playsInline
                    loop
                    muted
                >
                    <source
                        src={`http://localhost:5001/${blog.video}`}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </Box>
            )}

            {/* Content Section */}
            <Box p={4} display="flex" flexDirection="column">
                <Heading as="h2" size="md" mb={2} noOfLines={2}>
                    {blog.title}
                </Heading>
                <Text mb={4} noOfLines={3}>
                    {blog.content}
                </Text>

                {/* Author Info */}
                <Flex alignItems="center" mb={4}>
                    <Avatar
                        name={blog.author.name}
                        src={blog.author.avatar}
                        size="sm"
                        mr={2}
                    />
                    <Box>
                        <Text fontWeight="bold">{blog.author.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </Text>
                    </Box>
                </Flex>

                {/* Engagement Metrics */}
                <Flex justify="space-between" alignItems="center" mb={4}>
                    <LikeDislikeButtons
                        blogId={blog._id}
                        likes={blog.likes || []}
                        dislikes={blog.dislikes || []}
                        onUpdate={handleBlogUpdate}
                    />
                    <Text color="gray.500" fontSize="sm">
                        {blog.comments?.length || 0} comments
                    </Text>
                </Flex>

                {/* Read More Button */}
                <Link as={RouterLink} to={`/blogs/${blog._id}`} mt="auto">
                    <Button colorScheme="blue" width="full">
                        Read More
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default BlogCard;
