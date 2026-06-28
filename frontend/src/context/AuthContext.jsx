import React, { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser, logoutUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Restore session dari localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                // Data corrupt, bersihkan
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const response = await loginUser({ email, password });
            if (response.status === 'success') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
                return true;
            } else {
                setError(response.message || 'Login gagal.');
                return false;
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                (err.request ? 'Tidak dapat terhubung ke server. Periksa koneksi Anda.' : 'Terjadi kesalahan. Silakan coba lagi.');
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        setError(null);
        setLoading(true);
        try {
            const response = await registerUser({ name, email, password, password_confirmation });
            if (response.status === 'success') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
                return true;
            } else {
                setError(response.message || 'Registrasi gagal.');
                return false;
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                (err.request ? 'Tidak dapat terhubung ke server. Periksa koneksi Anda.' : 'Terjadi kesalahan. Silakan coba lagi.');
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await logoutUser();
        } catch {
            // Tetap lanjut logout meskipun API gagal
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};
