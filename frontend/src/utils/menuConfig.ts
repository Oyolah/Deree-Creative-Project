// utils/menuConfig.ts
import { ButtonProps } from "@chakra-ui/react";

interface MenuItem {
    label: string;
    path?: string; // Path for navigation
    onClick?: () => void; // Function to call on click
    icon?: React.ReactElement; // Optional icon
    isVisible?: boolean; // Conditionally show/hide the item
    style?: ButtonProps; // Custom styles for the item
}

export const getMenuItems = (
    isLoggedIn: boolean,
    logout: () => void
): MenuItem[] => {
    const commonMenuItems: MenuItem[] = [
        {
            label: "Quiz",
            path: "/quiz",
            isVisible: true,
        },
        {
            label: "Leaderboard",
            path: "/leaderboard",
            isVisible: true,
        },
        {
            label: "Contact",
            path: "/contact",
            isVisible: true,
        },
    ];

    const loggedInMenuItems: MenuItem[] = [
        {
            label: "Write",
            path: "/write",
            isVisible: true,
        },
        {
            label: "Profile",
            path: "/profile",
            isVisible: true,
        },
        {
            label: "Logout",
            onClick: logout,
            isVisible: true,
            style: { colorScheme: "red", variant: "solid" }, // Custom style for Logout (You can apply custom style to any menu)
        },
    ];

    const loggedOutMenuItems: MenuItem[] = [
        {
            label: "Login",
            path: "/login",
            isVisible: true,
        },
        {
            label: "Register",
            path: "/register",
            isVisible: true,
        },
    ];

    return [
        ...commonMenuItems,
        ...(isLoggedIn ? loggedInMenuItems : loggedOutMenuItems),
    ];
};
