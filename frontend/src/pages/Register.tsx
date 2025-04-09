import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Link,
    Heading,
    VStack,
    Text,
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
            await axios.post("/api/auth/register", {
                name,
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
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            let errorMessage = "Registration failed. Please try again.";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
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
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            width="100vh"
            px={4}
        >
            <Box
                w="100%"
                maxW="md"
                bg="white"
                p={8}
                borderRadius="xl"
                boxShadow="lg"
            >
                <Heading mb={6} textAlign="center" size="lg">
                    Register
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" w="full">
                            Register
                        </Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account?{" "}
                    <Link
                        as={RouterLink}
                        to="/login"
                        color="teal.500"
                        fontWeight="medium"
                    >
                        Login
                    </Link>
                </Text>
            </Box>
        </Box>
    );
};

export default Register;
