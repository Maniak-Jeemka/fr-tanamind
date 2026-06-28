import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register, loading, error, clearError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const success = await register(name, email, password, passwordConfirmation);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Full Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email address</label>
                    <input 
                        type="email" 
                        required
                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Password</label>
                    <input 
                        type="password" 
                        required
                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Confirm Password</label>
                    <input 
                        type="password" 
                        required
                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                        placeholder="••••••••"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        disabled={loading}
                    />
                </div>
                {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                )}
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all clay-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
