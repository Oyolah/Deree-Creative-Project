// pages/Login.tsx
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
import { useAuth } from "../AuthContext/AuthContext";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast({
                title: "Login successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/"); // Redirect to home page after login
        } catch (error) {
            toast({
                title: "Login failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Invalid credentials",
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
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4} w="full">
                    Login
                </Button>
            </form>
            <Box mt={4}>
                Don't have an account?{" "}
                <Link as={RouterLink} to="/register" color="teal.500">
                    Register
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
