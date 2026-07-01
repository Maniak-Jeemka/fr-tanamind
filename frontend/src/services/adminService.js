import api from "./api";

/**
 * Ambil statistik global untuk admin
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const getAdminStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};

/**
 * Ambil daftar semua user untuk admin
 * @returns {Promise<{ status: string, message: string, data: array }>}
 */
export const getAdminUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

/**
 * Hapus user berdasarkan ID (khusus Admin)
 * @param {string|number} id
 * @returns {Promise<{ status: string, message: string, data: null }>}
 */
export const deleteUser = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
};
