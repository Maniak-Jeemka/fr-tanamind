import api from "./api";

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string, password_confirmation: string }} data
 * @returns {Promise<{ status: string, message: string, data: { token: string, user: object } }>}
 */
export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

/**
 * Login an existing user
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ status: string, message: string, data: { token: string, user: object } }>}
 */
export const loginUser = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

/**
 * Logout the current user (requires auth token)
 * @returns {Promise<{ status: string, message: string }>}
 */
export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

/**
 * Get the current user profile (requires auth token)
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const getCurrentUser = async () => {
    const response = await api.get("/user");
    return response.data;
};

/**
 * Update the current user profile
 * @param {FormData} formData
 * @returns {Promise<{ status: string, message: string, data: object }>}
 */
export const updateProfile = async (formData) => {
    formData.append("_method", "PUT");
    const response = await api.post("/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};
