// services/adminService.ts
import api from "../utils/api";

export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
};

export const deleteBlog = async (blogId: string) => {
    const response = await api.delete(`/admin/blogs/${blogId}`);
    return response.data;
};

export const deleteComment = async (commentId: string) => {
    const response = await api.delete(`/admin/comments/${commentId}`);
    return response.data;
};

export const deleteLeaderboardEntry = async (entryId: string) => {
    const response = await api.delete(`/admin/leaderboard/${entryId}`);
    return response.data;
};

export const fetchAllUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const fetchAllComments = async () => {
    const response = await api.get("/admin/comments");
    return response.data;
};
