// components/LikeDislikeButtons.tsx
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../utils/config";

interface LikeDislikeButtonsProps {
    blogId: string;
    likes: string[];
    dislikes: string[];
    onUpdate: (updatedLikes: string[], updatedDislikes: string[]) => void;
}

const LikeDislikeButtons = ({
    blogId,
    likes,
    dislikes,
    onUpdate,
}: LikeDislikeButtonsProps) => {
    const toast = useToast();
    const [isLoadingLike, setIsLoadingLike] = useState(false);
    const [isLoadingDislike, setIsLoadingDislike] = useState(false);

    // Handle like toggle
    const handleLike = async () => {
        setIsLoadingLike(true);
        try {
            const res = await axios.put<{
                likes: string[];
                dislikes: string[];
            }>(`${baseURL}/api/blogs/${blogId}/like`);
            onUpdate(res.data.likes, res.data.dislikes); // Update state with new likes and dislikes
        } catch (error) {
            console.error("Failed to toggle like:", error);
            toast({
                title: "Failed to toggle like",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoadingLike(false);
        }
    };

    // Handle dislike toggle
    const handleDislike = async () => {
        setIsLoadingDislike(true);
        try {
            const res = await axios.put<{
                likes: string[];
                dislikes: string[];
            }>(`${baseURL}/api/blogs/${blogId}/dislike`);
            onUpdate(res.data.likes, res.data.dislikes); // Update state with new likes and dislikes
        } catch (error) {
            console.error("Failed to toggle dislike:", error);
            toast({
                title: "Failed to toggle dislike",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoadingDislike(false);
        }
    };

    // Check if the current user has liked/disliked the blog
    const userIdentifier = "Anonymous"; // Replace with actual user ID or IP
    const hasLiked = likes.includes(userIdentifier);
    const hasDisliked = dislikes.includes(userIdentifier);

    return (
        <Box>
            <Button
                leftIcon={<FaThumbsUp />}
                onClick={handleLike}
                colorScheme={hasLiked ? "teal" : "gray"}
                isLoading={isLoadingLike}
                mr={2}
            >
                Like ({likes.length})
            </Button>
            <Button
                leftIcon={<FaThumbsDown />}
                onClick={handleDislike}
                colorScheme={hasDisliked ? "red" : "gray"}
                isLoading={isLoadingDislike}
            >
                Dislike ({dislikes.length})
            </Button>
        </Box>
    );
};

export default LikeDislikeButtons;
