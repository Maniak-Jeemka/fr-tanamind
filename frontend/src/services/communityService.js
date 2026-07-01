import api from "./api";

/**
 * Ambil semua post komunitas, terbaru dulu
 * @returns {Promise<{ status: string, message: string, data: array }>}
 */
export const getCommunityPosts = async () => {
    const response = await api.get("/community");
    return response.data;
};

/**
 * Buat post komunitas baru dari scan milik user
 * @param {{ scan_result_id: number, caption: string }} data
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const createCommunityPost = async (data) => {
    const response = await api.post("/community", data);
    return response.data;
};

/**
 * Tambah komentar ke post komunitas
 * @param {string|number} postId
 * @param {{ body: string }} data
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const addComment = async (postId, data) => {
    const response = await api.post(`/community/${postId}/comments`, data);
    return response.data;
};

/**
 * Hapus post komunitas berdasarkan ID
 * @param {string|number} id
 * @returns {Promise<{ status: string, message: string, data: null }>}
 */
export const deleteCommunityPost = async (id) => {
    const response = await api.delete(`/community/${id}`);
    return response.data;
};

/**
 * Hapus komentar berdasarkan ID
 * @param {string|number} id
 * @returns {Promise<{ status: string, message: string, data: null }>}
 */
export const deleteComment = async (id) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
};
