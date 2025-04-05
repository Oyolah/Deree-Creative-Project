// // // components/Header.tsx
// // import {
// //     Flex,
// //     Box,
// //     Link,
// //     Button,
// //     Avatar,
// //     useColorModeValue,
// //     Menu,
// //     MenuButton,
// //     MenuList,
// //     MenuItem as ChakraMenuItem,
// //     IconButton,
// // } from "@chakra-ui/react";
// // import { Link as RouterLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../AuthContext/AuthContext";
// // import { HamburgerIcon } from "@chakra-ui/icons"; // For mobile menu
// // import { getMenuItems } from "../utils/menuConfig"; // Import the menu configuration

// // const Header = () => {
// //     const { user, logout } = useAuth();
// //     const bgColor = useColorModeValue("gray.100", "gray.900");
// //     const navigate = useNavigate();

// //     const handleLogout = () => {
// //         logout(); // Call the logout function
// //         navigate("/"); // Redirect to home after logout
// //     };

// //     // Get menu items based on authentication state
// //     const menuItems = getMenuItems(!!user, handleLogout);

// //     return (
// //         <Flex
// //             bg={bgColor}
// //             p={4}
// //             justifyContent="space-between"
// //             alignItems="center"
// //             position="fixed" // Make the header fixed
// //             top={0} // Stick to the top of the page
// //             left={0} // Align to the left edge
// //             right={0} // Align to the right edge
// //             zIndex={1000} // Ensure the header stays above other content
// //             boxShadow="sm" // Add a subtle shadow for better visibility
// //             height="64px" // Fixed height for the header
// //             minHeight="64px" // Ensure the height doesn't shrink
// //         >
// //             {/* Logo on the left */}
// //             <Box>
// //                 <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
// //                     MERN Blog
// //                 </Link>
// //             </Box>

// //             {/* Navigation links on the right */}
// //             <Flex alignItems="center" gap={4}>
// //                 {/* Desktop Menu */}
// //                 <Box display={{ base: "none", md: "flex" }} gap={4}>
// //                     {menuItems.map(
// //                         (item) =>
// //                             item.isVisible && (
// //                                 <Link
// //                                     key={item.label}
// //                                     as={RouterLink}
// //                                     to={item.path || "#"}
// //                                     onClick={item.onClick}
// //                                 >
// //                                     <Button
// //                                         colorScheme={
// //                                             item.style?.colorScheme || "teal"
// //                                         }
// //                                         variant={item.style?.variant || "ghost"}
// //                                         {...item.style} // Apply custom styles
// //                                     >
// //                                         {item.label}
// //                                     </Button>
// //                                 </Link>
// //                             )
// //                     )}
// //                 </Box>

// //                 {/* Mobile Menu */}
// //                 <Menu>
// //                     <MenuButton
// //                         as={IconButton}
// //                         aria-label="Menu"
// //                         icon={<HamburgerIcon />}
// //                         display={{ base: "block", md: "none" }} // Show only on mobile
// //                         variant="ghost"
// //                     />
// //                     <MenuList>
// //                         {menuItems.map(
// //                             (item) =>
// //                                 item.isVisible && (
// //                                     <ChakraMenuItem
// //                                         key={item.label}
// //                                         onClick={item.onClick}
// //                                         as={RouterLink}
// //                                         to={item.path || "#"}
// //                                     >
// //                                         {item.label}
// //                                     </ChakraMenuItem>
// //                                 )
// //                         )}
// //                     </MenuList>
// //                 </Menu>

// //                 {/* User Avatar (if logged in) */}
// //                 {user && (
// //                     <Avatar
// //                         size="sm"
// //                         name={user.name || user.email}
// //                         src={user.avatar || ""}
// //                     />
// //                 )}
// //             </Flex>
// //         </Flex>
// //     );
// // };

// // export default Header;

// // components/Header.tsx
// import {
//     Flex,
//     Box,
//     Link,
//     Button,
//     Avatar,
//     useColorModeValue,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem as ChakraMenuItem,
//     IconButton,
// } from "@chakra-ui/react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext/AuthContext";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import { getMenuItems } from "../utils/menuConfig";

// const Header = () => {
//     const { user, logout } = useAuth();
//     const bgColor = useColorModeValue("gray.100", "gray.900");
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate("/");
//     };

//     // Get menu items based on authentication state and user role
//     const menuItems = getMenuItems(!!user, handleLogout, user);

//     return (
//         <Flex
//             bg={bgColor}
//             p={4}
//             justifyContent="space-between"
//             alignItems="center"
//             position="fixed"
//             top={0}
//             left={0}
//             right={0}
//             zIndex={1000}
//             boxShadow="sm"
//             height="64px"
//             minHeight="64px"
//         >
//             {/* Logo on the left */}
//             <Box>
//                 <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
//                     MERN Blog
//                 </Link>
//             </Box>

//             {/* Navigation links on the right */}
//             <Flex alignItems="center" gap={4}>
//                 {/* Desktop Menu */}
//                 <Box display={{ base: "none", md: "flex" }} gap={4}>
//                     {menuItems.map(
//                         (item) =>
//                             item.isVisible && (
//                                 <Link
//                                     key={item.label}
//                                     as={RouterLink}
//                                     to={item.path || "#"}
//                                     onClick={item.onClick}
//                                 >
//                                     <Button
//                                         colorScheme={
//                                             item.style?.colorScheme || "teal"
//                                         }
//                                         variant={item.style?.variant || "ghost"}
//                                         {...item.style}
//                                     >
//                                         {item.label}
//                                     </Button>
//                                 </Link>
//                             )
//                     )}
//                 </Box>

//                 {/* Mobile Menu */}
//                 <Menu>
//                     <MenuButton
//                         as={IconButton}
//                         aria-label="Menu"
//                         icon={<HamburgerIcon />}
//                         display={{ base: "block", md: "none" }}
//                         variant="ghost"
//                     />
//                     <MenuList>
//                         {menuItems.map(
//                             (item) =>
//                                 item.isVisible && (
//                                     <ChakraMenuItem
//                                         key={item.label}
//                                         onClick={item.onClick}
//                                         as={RouterLink}
//                                         to={item.path || "#"}
//                                     >
//                                         {item.label}
//                                     </ChakraMenuItem>
//                                 )
//                         )}
//                     </MenuList>
//                 </Menu>

//                 {/* User Avatar (if logged in) */}
//                 {user && (
//                     <Avatar
//                         size="sm"
//                         name={user.name || user.email}
//                         src={user.avatar || ""}
//                     />
//                 )}
//             </Flex>
//         </Flex>
//     );
// };

// export default Header;

// components/Header.tsx
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
                <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
                    MERN Blog
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
