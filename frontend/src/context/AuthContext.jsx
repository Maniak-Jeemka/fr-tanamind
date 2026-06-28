import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock checking local storage for existing session
        const storedUser = localStorage.getItem('mock_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        let role = 'petani';
        if (email.toLowerCase().startsWith('admin')) {
            role = 'admin';
        }
        
        const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email: email,
            role: role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            city: 'Bandung, Indonesia'
        };

        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('mock_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
