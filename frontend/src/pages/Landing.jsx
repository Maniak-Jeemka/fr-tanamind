import React from 'react';
import { Navigate } from 'react-router-dom';

const Landing = () => {
    const token = localStorage.getItem('token');
    return <Navigate to={token ? '/dashboard' : '/login'} replace />;
};

export default Landing;
