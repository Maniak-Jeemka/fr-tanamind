import api from "./api";

/**
 * Upload gambar dan jalankan prediksi ML
 * @param {FormData} formData - FormData berisi 'image' dan opsional 'notes'
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const uploadScan = async (formData) => {
    const response = await api.post("/scan", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

/**
 * Ambil semua riwayat scan milik user yang login
 * @returns {Promise<{ status: string, message: string, data: array }>}
 */
export const getScanHistory = async () => {
    const response = await api.get("/scan");
    return response.data;
};

/**
 * Lihat detail scan berdasarkan ID
 * @param {string|number} id
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const getScanDetail = async (id) => {
    const response = await api.get(`/scan/${id}`);
    return response.data;
};

/**
 * Hapus riwayat scan berdasarkan ID
 * @param {string|number} id
 * @returns {Promise<{ status: string, message: string, data: null }>}
 */
export const deleteScan = async (id) => {
    const response = await api.delete(`/scan/${id}`);
    return response.data;
};
