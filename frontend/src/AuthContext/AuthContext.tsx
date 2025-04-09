// context/AuthContext.tsx
import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import axios from "axios";
import { User } from "../types/types";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean; // Add loading here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Check if the user is already logged in on initial load
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // Start loading
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Fetch the user's profile using the token
                    const res = await axios.get<{ data: User }>(
                        "/api/auth/profile",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    if (res.data) {
                        setUser(res.data); // Update the user state
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                    localStorage.removeItem("token"); // Remove invalid token
                }
            }
            setLoading(false); // End loading
        };
        fetchUser();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post<{
                data: { token: string; user: User };
            }>("/api/auth/login", { email, password });
            if (res.data.data) {
                localStorage.setItem("token", res.data.data.token); // Save token to localStorage
                setUser(res.data.data.user); // Update user state
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        setUser(null); // Clear user state
    };

    return (
        <AuthContext.Provider value={{ loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
