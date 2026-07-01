import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { Mail, Briefcase, Camera, User } from 'lucide-react';
import { updateProfile } from '../services/authService';
import { showToast, showError } from '../lib/swal';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Sync state when entering edit mode or user changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setOccupation(user.occupation || '');
            setAvatarPreview(user.avatar || null);
            setAvatarFile(null);
        }
    }, [user, isEditing]);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Show loading spinner
        Swal.fire({
            title: 'Updating Profile...',
            html: 'Please wait while we update your details.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#f0f4ea',
            color: '#34482c'
        });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('occupation', occupation);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const response = await updateProfile(formData);
            if (response.status === 'success') {
                updateUser(response.data);
                Swal.close();
                showToast('Profile updated successfully!', 'success');
                setIsEditing(false);
            } else {
                Swal.close();
                showError('Update Failed', response.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            Swal.close();
            const message = error.response?.data?.message || 'An error occurred. Please try again.';
            showError('Update Failed', message);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Profile</h1>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-xl transition-all clay-primary cursor-pointer"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <Card className="bg-card clay-sm">
                <CardContent className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Avatar Upload with Preview */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group w-24 h-24 rounded-2xl overflow-hidden clay-md">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-bold">
                                            {name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-semibold gap-1">
                                        <Camera className="w-5 h-5" />
                                        <span>Change</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={handleAvatarChange} 
                                        />
                                    </label>
                                </div>
                                <span className="text-xs text-muted-foreground">Click to upload photo (max 2MB)</span>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        Full Name
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                                        Occupation
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-input border border-transparent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all clay-inset"
                                        placeholder="Enter your occupation (e.g. Petani, Student)"
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-border">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all clay-primary cursor-pointer text-center"
                                >
                                    Save Changes
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 rounded-xl transition-all border border-border cursor-pointer text-center"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            {/* Avatar Display */}
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 clay-md" />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold shrink-0 clay-primary">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            )}

                            {/* Details Display */}
                            <div className="flex-1 space-y-2.5">
                                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-3">
                                    <h2 className="text-2xl font-bold text-foreground">{user?.name || 'User'}</h2>
                                </div>
                                <div className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                                    <span className="flex items-center justify-center md:justify-start gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground/75" /> 
                                        {user?.email || 'user@example.com'}
                                    </span>
                                    {user?.occupation && (
                                        <span className="flex items-center justify-center md:justify-start gap-2">
                                            <Briefcase className="w-4 h-4 text-muted-foreground/75" /> 
                                            {user.occupation}
                                        </span>
                                    )}
                                </div>
                                {user?.created_at && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Member since: {new Date(user.created_at).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
