import {
    Flex,
    Box,
    Link,
    Button,
    Avatar,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem as ChakraMenuItem,
    IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getMenuItems } from "../utils/menuConfig";

const Header = () => {
    const { user, logout } = useAuth();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Pass the full user object to getMenuItems
    const menuItems = getMenuItems(!!user, handleLogout, user);

    return (
        <Flex
            bg={bgColor}
            p={4}
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            boxShadow="sm"
            height="64px"
            minHeight="64px"
        >
            {/* Logo */}
            <Box>
                {/* <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
                    17Roots
                </Link> */}
                <Link
                    as={RouterLink}
                    to="/"
                    fontWeight="extrabold"
                    fontSize="4xl"
                    color="teal.500"
                    _hover={{ textDecoration: "none", color: "teal.600" }}
                >
                    17Roots
                </Link>
            </Box>

            {/* Navigation */}
            <Flex alignItems="center" gap={4}>
                {/* Desktop Menu */}
                <Box display={{ base: "none", md: "flex" }} gap={4}>
                    {menuItems.map(
                        (item) =>
                            item.isVisible && (
                                <Link
                                    key={item.label}
                                    as={RouterLink}
                                    to={item.path || "#"}
                                    onClick={item.onClick}
                                >
                                    <Button
                                        fontSize="2xl"
                                        colorScheme={
                                            item.style?.colorScheme || "teal"
                                        }
                                        variant={item.style?.variant || "ghost"}
                                        {...item.style}
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            )
                    )}
                </Box>

                {/* Mobile Menu */}
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Menu"
                        icon={<HamburgerIcon />}
                        display={{ base: "block", md: "none" }}
                        variant="ghost"
                    />
                    <MenuList>
                        {menuItems.map(
                            (item) =>
                                item.isVisible && (
                                    <ChakraMenuItem
                                        key={item.label}
                                        onClick={item.onClick}
                                        as={RouterLink}
                                        to={item.path || "#"}
                                    >
                                        {item.label}
                                    </ChakraMenuItem>
                                )
                        )}
                    </MenuList>
                </Menu>

                {/* User Avatar */}
                {user && (
                    <Avatar
                        size="sm"
                        name={user.name || user.email}
                        src={user.avatar || ""}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default Header;
