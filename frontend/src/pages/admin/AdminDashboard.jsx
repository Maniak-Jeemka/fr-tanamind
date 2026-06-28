import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, Activity, Crosshair, Server, Database, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const kpis = [
        { label: 'Active Users', value: '1,248', icon: Users, color: 'text-blue-500' },
        { label: 'Scans (30d)', value: '8,432', icon: Activity, color: 'text-primary' },
        { label: 'Model Accuracy', value: '94.2%', icon: Crosshair, color: 'text-purple-500' },
        { label: 'System Uptime', value: '99.9%', icon: Server, color: 'text-primary' }
    ];

    const users = [
        { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'Grower', scans: 45, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
        { id: 2, name: 'Admin Tanamind', email: 'admin@tanamind.com', role: 'Admin', scans: 120, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
        { id: 3, name: 'Siti Aminah', email: 'siti@example.com', role: 'Grower', scans: 12, status: 'Inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
        { id: 4, name: 'Ahmad Faisal', email: 'ahmad@example.com', role: 'Grower', scans: 89, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
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
                        {/* Model Status Widget */}
                        <Card className="bg-card border-border clay-sm">
                            <CardHeader className="border-b border-border pb-4">
                                <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                                    <Database className="w-5 h-5 text-primary" />
                                    Model Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                        <div className="text-sm text-muted-foreground mb-1">Precision</div>
                                        <div className="text-xl font-bold text-foreground">93.8%</div>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                        <div className="text-sm text-muted-foreground mb-1">Recall</div>
                                        <div className="text-xl font-bold text-foreground">91.5%</div>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                        <div className="text-sm text-muted-foreground mb-1">F1 Score</div>
                                        <div className="text-xl font-bold text-foreground">92.6%</div>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border clay-inset">
                                        <div className="text-sm text-muted-foreground mb-1">Avg Latency</div>
                                        <div className="text-xl font-bold text-foreground">450ms</div>
                                    </div>
                                </div>
                                <button className="w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-3 rounded-xl transition-all border border-border">
                                    Retrain Model
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="animate-in fade-in duration-300">
                    <Card className="bg-card border-border clay-sm">
                        <CardHeader className="border-b border-border pb-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg text-card-foreground">Manage Users</CardTitle>
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-all clay-primary">
                                Add User
                            </button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/50 text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">User</th>
                                            <th className="px-6 py-4 font-medium">Role</th>
                                            <th className="px-6 py-4 font-medium">Scans</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {users.map((u) => (
                                            <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-muted" />
                                                    <div>
                                                        <div className="font-medium text-foreground">{u.name}</div>
                                                        <div className="text-xs text-muted-foreground">{u.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-foreground">
                                                    <Badge className={u.role === 'Admin' ? 'bg-purple-500/10 text-purple-500 border-0' : 'bg-muted text-muted-foreground border-0'}>
                                                        {u.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-foreground font-medium">{u.scans}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={
                                                        u.status === 'Active' ? 'bg-primary/10 text-primary border-0' : 'bg-red-500/10 text-red-500 border-0'
                                                    }>
                                                        {u.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
