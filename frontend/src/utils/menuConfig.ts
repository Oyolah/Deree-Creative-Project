// utils/menuConfig.ts
import { ButtonProps } from "@chakra-ui/react";
import { User } from "../types/types";

interface MenuItem {
    label: string;
    path?: string;
    onClick?: () => void;
    icon?: React.ReactElement;
    isVisible?: boolean;
    style?: ButtonProps;
}

export const getMenuItems = (
    isLoggedIn: boolean,
    logout: () => void,
    user?: User | null
): MenuItem[] => {
    const commonMenuItems: MenuItem[] = [
        {
            label: "Home",
            path: "/",
            isVisible: true,
        },
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
    ];

    const adminMenuItems: MenuItem[] = [
        {
            label: "Admin Dashboard",
            path: "/admin",
            isVisible: user?.role === "admin",
            style: {
                colorScheme: "purple",
                variant: "solid",
            },
        },
    ];

    const loggedInMenuItems: MenuItem[] = [
        {
            label: "Write",
            path: "/write",
            isVisible: true,
        },
        {
            label: "Logout",
            onClick: logout,
            isVisible: true,
            style: {
                colorScheme: "red",
                variant: "solid",
            },
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
        ...(isLoggedIn
            ? [...adminMenuItems, ...loggedInMenuItems]
            : loggedOutMenuItems),
    ];
};
