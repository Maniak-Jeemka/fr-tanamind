import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, Activity, Scan, MessageSquare, Database, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { getAdminStats, getAdminUsers, deleteUser } from '../../services/adminService';
import { useAuth } from '../../hooks/useAuth';
import { showConfirm, showError, showToast } from '../../lib/swal';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes] = await Promise.all([
                getAdminStats(),
                getAdminUsers()
            ]);
            
            if (statsRes.status === 'success') setStats(statsRes.data);
            if (usersRes.status === 'success') setUsersList(usersRes.data);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        const confirmResult = await showConfirm(
            'Delete User',
            'Are you sure you want to delete this user? This will delete all of their scans, posts, and comments. This action cannot be undone.',
            'Yes, Delete',
            'Cancel'
        );
        if (!confirmResult.isConfirmed) return;

        try {
            const res = await deleteUser(userId);
            if (res.status === 'success') {
                showToast('User deleted successfully!', 'success');
                fetchData();
            } else {
                showError('Deletion Failed', res.message || 'Failed to delete user.');
            }
        } catch (err) {
            console.error("Failed to delete user", err);
            showError('Deletion Failed', 'An error occurred while deleting. Please try again.');
        }
    };

    const kpis = [
        { label: 'Total Users', value: stats?.total_users || 0, icon: Users, color: 'text-blue-500' },
        { label: 'Total Scans', value: stats?.total_scans || 0, icon: Scan, color: 'text-primary' },
        { label: 'Scans Today', value: stats?.scans_today || 0, icon: Activity, color: 'text-purple-500' },
        { label: 'Total Posts', value: stats?.total_posts || 0, icon: MessageSquare, color: 'text-primary' }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage users and monitor system performance.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-muted/30 p-1 rounded-xl w-fit border border-border clay-inset">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Users
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading admin data...</div>
            ) : (
                <>
                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* KPI Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {kpis.map((kpi, i) => (
                                    <Card key={i} className="bg-card border-border clay-sm">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                                            <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Disease Distribution Widget */}
                                <Card className="bg-card border-border clay-sm">
                                    <CardHeader className="border-b border-border pb-4">
                                        <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                                            <Database className="w-5 h-5 text-primary" />
                                            Disease Distribution
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        {stats?.disease_distribution && Object.entries(stats.disease_distribution).length > 0 ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(stats.disease_distribution).map(([disease, count]) => (
                                                    <div key={disease} className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                                        <div className="text-sm text-muted-foreground mb-1">{disease}</div>
                                                        <div className="text-xl font-bold text-foreground">{count}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center text-muted-foreground py-4">No disease data yet.</div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="animate-in fade-in duration-300">
                            <Card className="bg-card border-border clay-sm">
                                <CardHeader className="border-b border-border pb-4">
                                    <CardTitle className="text-lg text-card-foreground">Manage Users</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-muted/50 text-muted-foreground">
                                                <tr>
                                                    <th className="px-6 py-4 font-medium">User</th>
                                                    <th className="px-6 py-4 font-medium">Role</th>
                                                    <th className="px-6 py-4 font-medium">Scans</th>
                                                    <th className="px-6 py-4 font-medium">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {usersList.map((u) => (
                                                    <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                                        <td className="px-6 py-4 flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                                {u.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-foreground">{u.name}</div>
                                                                <div className="text-xs text-muted-foreground">{u.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-foreground">
                                                            <Badge className={u.role === 'admin' ? 'bg-purple-500/10 text-purple-500 border-0 capitalize' : 'bg-muted text-muted-foreground border-0 capitalize'}>
                                                                {u.role}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 text-foreground font-medium">{u.scan_results_count || 0}</td>
                                                        <td className="px-6 py-4 text-foreground">
                                                            {u.id !== user?.id ? (
                                                                <button 
                                                                    onClick={() => handleDeleteUser(u.id)}
                                                                    className="text-red-500 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            ) : (
                                                                <span className="text-xs text-muted-foreground font-medium">You</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {usersList.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">No users found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
