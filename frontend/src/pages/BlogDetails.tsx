import {
    Box,
    Heading,
    Text,
    Avatar,
    Button,
    useToast,
    Input,
    Textarea,
    VStack,
    Image,
    Flex,
    Container,
    Divider,
    Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Blog, Comment } from "../types/types";
import { baseURL } from "../utils/config";
import LikeDislikeButtons from "../components/LikeDislikeButtons";

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const toast = useToast();

    // Video playback state
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    // Fetch blog details
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get<Blog>(`${baseURL}api/blogs/${id}`);
                setBlog(res.data);
            } catch (error) {
                toast({
                    title: "Failed to fetch blog",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchBlog();
    }, [id]);

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get<Comment[]>(
                    `${baseURL}api/comments/${id}`
                );
                setComments(res.data);
            } catch (error) {
                toast({
                    title: "Failed to fetch comments",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchComments();
    }, [id]);

    // Handle video readiness
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleCanPlay = () => setIsVideoReady(true);
            video.addEventListener("canplay", handleCanPlay);

            return () => {
                video.removeEventListener("canplay", handleCanPlay);
            };
        }
    }, []);

    // Toggle play/pause
    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
                setIsPlaying(false);
            } else {
                if (isVideoReady) {
                    video.play().catch((error) => {
                        console.error("Failed to play video:", error);
                        toast({
                            title: "Failed to play video",
                            description: "The video format is not supported.",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    });
                    setIsPlaying(true);
                } else {
                    toast({
                        title: "Video not ready",
                        description: "The video is still loading.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        }
    };

    // Handle like/dislike updates
    const handleLikeDislikeUpdate = async (
        updatedLikes: string[],
        updatedDislikes: string[]
    ) => {
        if (!blog) return;
        setBlog({
            ...blog,
            likes: updatedLikes,
            dislikes: updatedDislikes,
        });
    };

    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            toast({
                title: "Comment cannot be empty",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const res = await axios.post<Comment>(`${baseURL}api/comments`, {
                blogId: id,
                text: newComment,
                username: username || "Anonymous",
            });
            setComments([...comments, res.data]);
            setNewComment("");
            setUsername("");
        } catch (error) {
            console.error("Failed to post comment:", error);
            toast({
                title: "Failed to post comment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (!blog) {
        return <Box>Loading...</Box>;
    }

    return (
        <Container maxW="container.lg" py={8} px={4}>
            {/* Blog Content */}
            <Box bg="white" borderRadius="lg" boxShadow="sm" p={6} mb={8}>
                <Heading as="h1" size="xl" mb={6}>
                    {blog.title}
                </Heading>

                {/* Media Section */}
                {blog.image && (
                    <Image
                        src={`${baseURL}${blog.image}`}
                        alt={blog.title}
                        mb={6}
                        borderRadius="md"
                        maxH="400px"
                        w="100%"
                        objectFit="cover"
                    />
                )}
                {blog.video && (
                    <Box
                        position="relative"
                        mb={6}
                        borderRadius="md"
                        overflow="hidden"
                    >
                        <Box
                            as="video"
                            ref={videoRef}
                            width="100%"
                            maxH="500px"
                            objectFit="contain"
                            onClick={togglePlay}
                            cursor="pointer"
                            controls
                        >
                            <source
                                src={`${baseURL}${blog.video}`}
                                type="video/mp4"
                            />
                            <source
                                src={`${baseURL}${blog.video.replace(
                                    ".mp4",
                                    ".webm"
                                )}`}
                                type="video/webm"
                            />
                            Your browser does not support the video tag.
                        </Box>
                    </Box>
                )}

                {/* Blog Content */}
                <Text
                    fontSize="lg"
                    lineHeight="tall"
                    whiteSpace="pre-line"
                    mb={8}
                >
                    {blog.content}
                </Text>

                {/* Author Info */}
                <Flex align="center" mb={6}>
                    <Avatar
                        name={blog.author.name}
                        src={blog.author.avatar}
                        size="md"
                        mr={4}
                    />
                    <Box>
                        <Text fontWeight="bold">{blog.author.name}</Text>
                        <Text color="gray.500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </Text>
                    </Box>
                </Flex>

                {/* Like/Dislike Buttons */}
                <Box mb={6}>
                    <LikeDislikeButtons
                        blogId={blog._id}
                        likes={blog.likes || []}
                        dislikes={blog.dislikes || []}
                        onUpdate={handleLikeDislikeUpdate}
                    />
                </Box>

                <Divider mb={8} />
            </Box>

            {/* Comments Section */}
            <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
                <Heading size="lg" mb={6}>
                    Comments ({comments.length})
                </Heading>

                {/* Comment Form */}
                <VStack spacing={4} mb={8}>
                    <Input
                        placeholder="Your name (optional)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                    />
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        size="lg"
                        rows={4}
                    />
                    <Button
                        colorScheme="teal"
                        onClick={handleCommentSubmit}
                        alignSelf="flex-end"
                        size="lg"
                    >
                        Post Comment
                    </Button>
                </VStack>

                {/* Comments List */}
                <Stack spacing={6}>
                    {comments.map((comment) => (
                        <Box
                            key={comment._id}
                            p={4}
                            borderWidth={1}
                            borderColor="gray.100"
                            borderRadius="md"
                        >
                            <Flex align="center" mb={2}>
                                <Avatar
                                    name={comment.user.name}
                                    src={comment.user.avatar}
                                    size="sm"
                                    mr={3}
                                />
                                <Text fontWeight="bold">
                                    {comment.user.name}
                                </Text>
                            </Flex>
                            <Text>{comment.text}</Text>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
};

export default BlogDetails;
