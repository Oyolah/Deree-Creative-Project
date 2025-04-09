// pages/AdminDashboard.tsx
import {
    Box,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import AdminUserPanel from "../components/AdminUserPanel";
import AdminBlogsPanel from "../components/admin/AdminBlogsPanel";
import AdminCommentsPanel from "../components/admin/AdminCommentsPanel";
import AdminLeaderboardPanel from "../components/admin/AdminLeaderboardPanel";

const AdminDashboard = () => {
    return (
        <Box p={4}>
            <Heading mb={6}>Admin Dashboard</Heading>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Users</Tab>
                    <Tab>Blogs</Tab>
                    <Tab>Comments</Tab>
                    <Tab>Leaderboard</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AdminUserPanel />
                    </TabPanel>
                    <TabPanel>
                        <AdminBlogsPanel />
                    </TabPanel>
                    <TabPanel>
                        <AdminCommentsPanel />
                    </TabPanel>
                    <TabPanel>
                        <AdminLeaderboardPanel />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AdminDashboard;
