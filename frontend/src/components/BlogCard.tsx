import {
    Box,
    Heading,
    Text,
    Avatar,
    Flex,
    Link,
    Image,
    useToast,
    Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { Blog } from "../types/types";

interface BlogCardProps {
    blog: Blog;
    onUpdate: (
        blogId: string,
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => void;
}

const BlogCard = ({ blog, onUpdate }: BlogCardProps) => {
    const toast = useToast();

    // Handle blog update after like/dislike
    const handleBlogUpdate = (
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => {
        onUpdate(blog._id, updatedLikes, updatedDislikes);
    };

    return (
        <Box borderWidth={1} borderRadius="md" p={4} mb={4}>
            <Heading as="h2" size="md" mb={2}>
                {blog.title}
            </Heading>
            <Text mb={4} noOfLines={3}>
                {blog.content}
            </Text>
            {blog.image && (
                <Image
                    src={`http://localhost:5001/${blog.image}`}
                    alt={blog.title}
                    mb={4}
                    borderRadius="md"
                    maxH="200px"
                    objectFit="cover"
                />
            )}
            {blog.video && (
                <Box position="relative" mb={4} maxH="200px" width="100%">
                    <Box
                        as="video"
                        controls // Add controls for playback
                        maxH="200px"
                        width="100%"
                        objectFit="cover"
                    >
                        <source
                            src={`http://localhost:5001/${blog.video}`}
                            type="video/mp4"
                        />
                        <source
                            src={`http://localhost:5001/${blog.video.replace(
                                ".mp4",
                                ".webm"
                            )}`}
                            type="video/webm"
                        />
                        Your browser does not support the video tag.
                    </Box>
                </Box>
            )}
            <Flex alignItems="center" mb={4}>
                <Avatar
                    name={blog.author.name}
                    src={blog.author.avatar}
                    size="sm"
                    mr={2}
                />
                <Text fontWeight="bold">{blog.author.name}</Text>
                <Text ml={2} color="gray.500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </Text>
            </Flex>
            <Flex gap={2} mb={4}>
                <LikeDislikeButtons
                    blogId={blog._id}
                    likes={blog.likes || []}
                    dislikes={blog.dislikes || []}
                    onUpdate={handleBlogUpdate} // Pass the handleBlogUpdate function
                />
                <Text ml="auto" color="gray.500">
                    Comments ({blog.comments?.length || 0})
                </Text>
            </Flex>
            <Link as={RouterLink} to={`/blogs/${blog._id}`}>
                <Button colorScheme="blue" w="full">
                    Read More
                </Button>
            </Link>
        </Box>
    );
};

export default BlogCard;
