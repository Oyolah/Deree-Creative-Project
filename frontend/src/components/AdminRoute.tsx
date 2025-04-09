// components/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { Box, Spinner } from "@chakra-ui/react";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;
