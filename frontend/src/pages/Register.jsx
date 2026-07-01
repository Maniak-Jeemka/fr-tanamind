import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Check, X } from "lucide-react";
import { showToast } from '../lib/swal';

const passwordRules = [
    { label: 'Minimum 8 characters', test: (pw) => pw.length >= 8 },
    { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
    { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
    { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
    { label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const { register, loading, error, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error]);

    const ruleResults = useMemo(() => passwordRules.map(r => r.test(password)), [password]);
    const allRulesPassed = ruleResults.every(Boolean);
    const passwordsMatch = password === passwordConfirmation;

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        // Client-side validation
        if (!allRulesPassed) {
            showToast('Password does not meet all requirements.', 'error');
            return;
        }
        if (!passwordsMatch) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        const success = await register(name, email, password, passwordConfirmation);
        if (success) {
            showToast('Registered successfully!', 'success');
            navigate('/dashboard');
        }
        // On failure: form values are preserved (React state is untouched)
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input 
                            type="text" 
                            required
                            className="w-full bg-input border border-transparent rounded-xl pl-11 pr-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                            placeholder="Input Your Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input 
                            type="email" 
                            required
                            className="w-full bg-input border border-transparent rounded-xl pl-11 pr-4 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                            placeholder="Input Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                        Password
                    </label>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full bg-input border border-transparent rounded-xl pl-11 pr-12 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                            placeholder="Input Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordTouched(true)}
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Password requirements checklist */}
                    {passwordTouched && (
                        <ul className="mt-2 space-y-1 text-xs">
                            {passwordRules.map((rule, i) => (
                                <li key={i} className={`flex items-center gap-1.5 transition-colors ${ruleResults[i] ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {ruleResults[i]
                                        ? <Check className="w-3.5 h-3.5 shrink-0" />
                                        : <X className="w-3.5 h-3.5 shrink-0" />}
                                    {rule.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                        Password Confirmation
                    </label>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                            type={showPasswordConfirmation ? "text" : "password"}
                            required
                            className="w-full bg-input border border-transparent rounded-xl pl-11 pr-12 py-3.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                            placeholder="Input Your Confirmation Password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary"
                        >
                            {showPasswordConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Password mismatch warning */}
                    {passwordConfirmation.length > 0 && !passwordsMatch && (
                        <p className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                            <X className="w-3.5 h-3.5 shrink-0" />
                            Passwords do not match.
                        </p>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                )}
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all clay-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <UserPlus className="w-4 h-4" />
                    {loading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
