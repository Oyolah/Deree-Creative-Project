import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use environment variable
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
