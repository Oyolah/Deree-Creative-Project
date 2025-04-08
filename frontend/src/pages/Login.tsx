// // pages/Login.tsx
// import { useState } from "react";
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     useToast,
//     Link,
// } from "@chakra-ui/react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext/AuthContext";

// const Login = () => {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const { login } = useAuth();
//     const toast = useToast();
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await login(email, password);
//             toast({
//                 title: "Login successful",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//             navigate("/"); // Redirect to home page after login
//         } catch (error) {
//             toast({
//                 title: "Login failed",
//                 description:
//                     error instanceof Error
//                         ? error.message
//                         : "Invalid credentials",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Box maxW="md" mx="auto" mt={10}>
//             <form onSubmit={handleSubmit}>
//                 <FormControl>
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl mt={4}>
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </FormControl>
//                 <Button type="submit" colorScheme="teal" mt={4} w="full">
//                     Login
//                 </Button>
//             </form>
//             <Box mt={4}>
//                 Don't have an account?{" "}
//                 <Link as={RouterLink} to="/register" color="teal.500">
//                     Register
//                 </Link>
//             </Box>
//         </Box>
//     );
// };

// export default Login;

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
    Heading,
    Text,
    VStack,
    Flex,
    Card,
    CardBody,
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
            navigate("/");
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
        <Flex
            minHeight="100vh"
            width="100vh"
            align="center"
            justify="center"
            px={4}
        >
            <Card
                width="700vh"
                maxW="lg"
                boxShadow="2xl"
                borderRadius="2xl"
                p={8}
            >
                <CardBody>
                    <VStack spacing={8} align="stretch">
                        <Box textAlign="center">
                            <Heading size="xl" mb={2}>
                                Welcome Back
                            </Heading>
                            <Text color="gray.500" fontSize="md">
                                Login to your account
                            </Text>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={5}>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="you@example.com"
                                        size="lg"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        size="lg"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    w="full"
                                    size="lg"
                                >
                                    Login
                                </Button>
                            </VStack>
                        </form>
                        <Box textAlign="center">
                            <Text fontSize="sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    as={RouterLink}
                                    to="/register"
                                    color="teal.500"
                                    fontWeight="medium"
                                >
                                    Register
                                </Link>
                            </Text>
                        </Box>
                    </VStack>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default Login;
