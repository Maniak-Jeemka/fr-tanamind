// src/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" }
});

// Otomatis sisipkan token di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 responses — auto logout jika token expired/invalid
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Redirect ke login jika belum di halaman auth
            if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;