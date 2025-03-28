import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", {
                name,
                // username, // Include username in the payload
                email,
                password,
            });
            toast({
                title: "Registration successful",
                description: "You can now log in",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration failed:", error);

            // Display error message from the backend or a generic message
            let errorMessage = "Registration failed. Please try again.";

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
                title: "Error",
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
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4} w="full">
                    Register
                </Button>
            </form>
            <Box mt={4}>
                Already have an account?{" "}
                <Link as={RouterLink} to="/login" color="teal.500">
                    Login
                </Link>
            </Box>
        </Box>
    );
};

export default Register;
