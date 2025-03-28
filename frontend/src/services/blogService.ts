import { Blog } from "../types/types";
import api from "../utils/api";

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>("/blogs");
    return response.data;
};
