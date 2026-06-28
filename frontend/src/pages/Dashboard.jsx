import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Sprout, Activity, Heart, AlertTriangle, Leaf, ChevronRight, X, Scan } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [showWelcome, setShowWelcome] = useState(true);

    const stats = [
        { title: 'Total Plants', value: '142', icon: Sprout, color: 'text-emerald-500' },
        { title: 'Scans Today', value: '12', icon: Activity, color: 'text-blue-500' },
        { title: 'Healthy Rate', value: '88%', icon: Heart, color: 'text-rose-500' },
        { title: 'Needs Care', value: '3', icon: AlertTriangle, color: 'text-amber-500' },
    ];

    const recentScans = [
        { id: 1, name: 'Tomato Leaf', status: 'Healthy', date: '2 mins ago', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100&h=100&fit=crop' },
        { id: 2, name: 'Monstera', status: 'Needs care', date: '1 hour ago', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?w=100&h=100&fit=crop' },
        { id: 3, name: 'Ficus', status: 'Healthy', date: '3 hours ago', image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=100&h=100&fit=crop' },
        { id: 4, name: 'Orchid', status: 'Diseased', date: 'Yesterday', image: 'https://images.unsplash.com/photo-1565514223617-e837f5deeb6b?w=100&h=100&fit=crop' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
                        Hi {user?.name || 'Admin'} <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Here's how your pak choy is doing today.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold clay-primary hover:bg-primary/90 transition-all">
                    <Scan className="w-5 h-5" />
                    New scan
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-card border-border clay-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2 bg-card border-border clay-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">Scan Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mock Chart Area */}
                        <div className="h-75 w-full flex items-end justify-between gap-2 px-2 pb-2 border-b border-border">
                            {/* Bars */}
                            {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 rounded-t-sm flex flex-col justify-end group hover:bg-primary/40 transition-colors" style={{ height: `${h}%` }}>
                                    <div className="w-full bg-primary rounded-t-sm" style={{ height: '4px' }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border clay-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">Garden Health</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        {/* Mock Doughnut Chart */}
                        <div className="relative w-48 h-48 rounded-full border-16 border-muted flex items-center justify-center mb-6">
                            {/* SVG segments for mockup */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#7ab847" strokeWidth="16" strokeDasharray="68 100" />
                                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="22 100" strokeDashoffset="-68" />
                                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="10 100" strokeDashoffset="-90" />
                            </svg>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-foreground">68%</div>
                                <div className="text-xs text-muted-foreground">Healthy</div>
                            </div>
                        </div>
                        
                        <div className="w-full space-y-3">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>Healthy
                                </div>
                                <span className="font-medium text-foreground">68%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>At Risk
                                </div>
                                <span className="font-medium text-foreground">22%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>Diseased
                                </div>
                                <span className="font-medium text-foreground">10%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Scans & Care List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border clay-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-card-foreground">Recent Scans</CardTitle>
                        <button className="text-sm text-primary hover:text-primary/80">View all</button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentScans.map((scan) => (
                            <div key={scan.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <img src={scan.image} alt={scan.name} className="w-12 h-12 rounded-lg object-cover" />
                                    <div>
                                        <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">{scan.name}</h4>
                                        <p className="text-sm text-muted-foreground">{scan.date}</p>
                                    </div>
                                </div>
                                <Badge className={
                                    scan.status === 'Healthy' ? 'bg-primary/10 text-primary hover:bg-primary/20 border-0' :
                                    scan.status === 'Needs care' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0' :
                                    'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0'
                                }>
                                    {scan.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Optional Today's Care List for symmetry */}
                <Card className="bg-card border-border clay-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">Today's Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { task: 'Water Tomato Plants', time: 'Morning', status: 'done' },
                            { task: 'Check Monstera Leaves', time: 'Afternoon', status: 'pending' },
                            { task: 'Apply fertilizer to Ficus', time: 'Evening', status: 'pending' },
                        ].map((task, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 clay-inset border border-border">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${task.status === 'done' ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                                    {task.status === 'done' && <Heart className="w-3 h-3 text-primary-foreground" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-medium ${task.status === 'done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.task}</h4>
                                    <p className="text-xs text-muted-foreground">{task.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
