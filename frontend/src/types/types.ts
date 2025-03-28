// User type
export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
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
    blog: string; // Blog ID
    user: User;
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
