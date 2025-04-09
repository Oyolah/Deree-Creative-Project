// src/components/admin/AdminUsersPanel.tsx
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { deleteUser, fetchAllUsers } from "../../services/adminService";

const AdminUsersPanel = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setUsers(data);
            } catch (error) {
                toast({
                    title: "Failed to load users",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter((user) => user._id !== userId));
            toast({
                title: "User deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to delete user",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Box>Loading users...</Box>;

    return (
        <Box overflowX="auto">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user._id}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default AdminUsersPanel;
