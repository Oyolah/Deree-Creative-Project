// pages/CreateBlog.tsx
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Flex,
    Tag,
    TagCloseButton,
    TagLabel,
    Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CreateBlog = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [pdf, setPdf] = useState<File | null>(null); // Add state for PDF
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const toast = useToast();
    const navigate = useNavigate();

    // Handle adding a tag
    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    // Handle removing a tag
    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!title || !content) {
            toast({
                title: "Title and content are required",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("tags", JSON.stringify(tags)); // Send tags as a JSON string
            if (image) formData.append("image", image);
            if (video) formData.append("video", video);
            if (pdf) formData.append("pdf", pdf); // Add PDF to the form data

            const res = await axios.post("/api/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast({
                title: "Blog created",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/");
        } catch (error) {
            console.error("Failed to create blog:", error);

            let errorMessage = "Something went wrong.";

            // Check if the error is an AxiosError
            if (axios.isAxiosError(error)) {
                // Access the error response data
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                // Handle generic errors
                errorMessage = error.message;
            }

            // Display the error message
            toast({
                title: "Failed to create blog",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Tags</FormLabel>
                    <Flex gap={2} wrap="wrap">
                        {tags.map((tag) => (
                            <Tag
                                key={tag}
                                size="md"
                                variant="solid"
                                colorScheme="teal"
                            >
                                <TagLabel>{tag}</TagLabel>
                                <TagCloseButton
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            </Tag>
                        ))}
                    </Flex>
                    <Input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        placeholder="Add a tag and press Enter"
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Image</FormLabel>
                    <Input
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .webp, .heic, .heif"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Video</FormLabel>
                    <Input
                        type="file"
                        accept=".mp4, .mkv, .mov, .m4v"
                        onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>PDF</FormLabel>
                    <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setPdf(e.target.files?.[0] || null)} // Add PDF file input
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4} w="full">
                    Create Blog
                </Button>
            </form>
        </Box>
    );
};

export default CreateBlog;
