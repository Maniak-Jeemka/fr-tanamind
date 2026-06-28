import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Scan, Users, User, ShieldCheck, LogOut, Leaf } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Scan', path: '/scan', icon: Scan },
        { name: 'Community', path: '/community', icon: Users },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    if (user?.role === 'admin') {
        navItems.push({ name: 'Admin', path: '/admin', icon: ShieldCheck });
    }

    return (
        <aside className="w-64 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border flex flex-col justify-between py-6 px-4">
            <div>
                {/* Logo */}
                <div className="flex items-center gap-3 px-2 mb-10 text-sidebar-primary">
                    <div className="bg-white p-1 rounded-xl shadow-sm clay-sm flex items-center justify-center">
                        <img src="/logo.jpg" alt="Tanamind Logo" className="w-8 h-8 object-cover rounded-lg" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-sidebar-foreground">Tanamind</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground clay-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-sidebar-foreground'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-semibold">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom Profile & Logout */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-2xl clay-inset">
                    <img src={user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-full bg-muted object-cover" />
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-semibold"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
