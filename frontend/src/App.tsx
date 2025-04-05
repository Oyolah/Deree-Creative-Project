// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { AuthProvider } from "./AuthContext/AuthContext";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AdminDashboard from "./pages/AdminDashboard"; // Add this import
import AdminRoute from "./components/AdminRoute"; // We'll create this next

const App = () => {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/quiz" element={<QuizPage />} />
                            <Route
                                path="/leaderboard"
                                element={<LeaderboardPage />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/write" element={<CreateBlog />} />
                            <Route
                                path="/blogs/:id"
                                element={<BlogDetails />}
                            />
                            <Route
                                path="/admin"
                                element={
                                    <AdminRoute>
                                        <AdminDashboard />
                                    </AdminRoute>
                                }
                            />
                        </Routes>
                    </Layout>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;
