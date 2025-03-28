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
    HStack,
    Image,
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

        // Update the blog state with the new likes and dislikes
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
                username: username || "Anonymous", // Use "Anonymous" if no username is provided
            });
            setComments([...comments, res.data]); // Add the new comment to the list
            setNewComment(""); // Clear the input field
            setUsername(""); // Clear the username field
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
        <Box maxW="2xl" mx="auto" mt={10}>
            <Heading>{blog.title}</Heading>
            {blog.image && (
                <Image
                    src={`${baseURL}${blog.image}`}
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
                        ref={videoRef}
                        maxH="200px"
                        width="100%"
                        objectFit="cover"
                        onClick={togglePlay}
                        cursor="pointer"
                        controls // Add controls for debugging
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
            <Text mt={4}>{blog.content}</Text>
            <Box mt={4}>
                <Avatar name={blog.author.name} src={blog.author.avatar} />
                <Text>{blog.author.name}</Text>
                <Text>{new Date(blog.createdAt).toLocaleDateString()}</Text>
            </Box>
            {/* Add LikeDislikeButtons component */}
            <Box mt={4}>
                <LikeDislikeButtons
                    blogId={blog._id}
                    likes={blog.likes || []}
                    dislikes={blog.dislikes || []}
                    onUpdate={handleLikeDislikeUpdate}
                />
            </Box>
            <Box mt={8}>
                <Heading size="md">Comments ({comments.length})</Heading>
                <VStack mt={4} spacing={4} align="start">
                    {comments.map((comment) => (
                        <Box
                            key={comment._id}
                            p={4}
                            borderWidth={1}
                            borderRadius="md"
                            w="full"
                        >
                            <HStack>
                                <Avatar
                                    name={comment.user.name}
                                    src={comment.user.avatar}
                                    size="sm"
                                />
                                <Text fontWeight="bold">
                                    {comment.user.name}
                                </Text>
                            </HStack>
                            <Text mt={2}>{comment.text}</Text>
                        </Box>
                    ))}
                </VStack>
                <Box mt={4}>
                    <Input
                        placeholder="Your name (optional)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        mb={2}
                    />
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <Button
                        mt={2}
                        colorScheme="teal"
                        onClick={handleCommentSubmit}
                    >
                        Post Comment
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BlogDetails;
