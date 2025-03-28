// components/Layout.tsx
import { Box } from "@chakra-ui/react";
import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box>
            {/* Header */}
            <Header />

            {/* Main Content */}
            <Box mt="64px" p={4}>
                {/* Add margin-top to account for the fixed header */}
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
