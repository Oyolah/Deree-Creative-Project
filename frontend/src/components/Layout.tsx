// components/Layout.tsx
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex direction="column" minH="100vh">
            {/* Fixed Header */}
            <Header />

            {/* Main Content */}
            <Box flex="1" mt="64px" p={4}>
                {children}
            </Box>
        </Flex>
    );
};

export default Layout;
