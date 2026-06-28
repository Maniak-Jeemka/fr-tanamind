import api from "./api";

/**
 * Ambil daftar penyakit beserta rekomendasinya
 * @returns {Promise<{ status: string, message: string, data: array }>}
 */
export const getDiseases = async () => {
    const response = await api.get("/diseases");
    return response.data;
};
