// User type
export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string; // Add role field
    createdAt: string;
    updatedAt: string;
}

// Blog type
export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: User;
    image?: string;
    video?: string;
    likes: string[]; // Array of user IDs who liked the blog
    dislikes: string[]; // Array of user IDs who disliked the blog
    createdAt: string;
    updatedAt: string;
    comments: string[];
    tags: string[];
}

// Comment type
export interface Comment {
    _id: string;
    user: {
        name: string;
        avatar: string;
    };
    blog: { title: string } | string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

// Auth context type
export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// API response type
export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
}

export interface Score {
    _id: string;
    playerName: string;
    correctAnswers: number;
    incorrectAnswers: number;
    date?: string; // <-- Add this line (make it optional if not always present)
}

// types/types.ts (or another appropriate file)
export interface LeaderboardEntry {
    playerName: string;
    correctAnswers: number;
    incorrectAnswers: number;
    date: string; // Assuming date is returned as a string from your API
}

// types/types.ts or an appropriate location
export interface Quiz {
    question: string;
    options: string[];
    correctAnswer: string;
}
