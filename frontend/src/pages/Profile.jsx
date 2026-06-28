import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { Settings, Award, History, Bell, Mail, Shield, Leaf, Scan, Flame, MapPin, Users } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Scans', value: '48' },
        { label: 'Plants Tracked', value: '12' },
        { label: 'Day Streak', value: '5', color: 'text-amber-500' },
        { label: 'Badges Earned', value: '3', color: 'text-primary' }
    ];

    const history = [
        { id: '#SCN-001', date: 'Jun 28, 2026', plant: 'Bed A - Row 2', result: 'Healthy', status: 'Safe' },
        { id: '#SCN-002', date: 'Jun 27, 2026', plant: 'Bed C - Row 1', result: 'Leaf Spot', status: 'Warning' },
        { id: '#SCN-003', date: 'Jun 26, 2026', plant: 'Greenhouse - Tray 4', result: 'Downy Mildew', status: 'Danger' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Profile Header Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Profile</h1>
            </div>

            {/* User Info Card */}
            <Card className="bg-card clay-sm">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-24 h-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold shrink-0 clay-primary">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h2 className="text-2xl font-bold text-foreground">{user?.name || 'Admin'}</h2>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 px-3">{user?.role || 'Admin'}</Badge>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> admin@tanamind.app</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Bandung, Indonesia</span>
                        </div>
                    </div>
                    <button className="bg-card hover:bg-muted text-foreground font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm clay-sm border-none mt-4 md:mt-0">
                        <Settings className="w-4 h-4" />
                        Edit
                    </button>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: Scan, value: '128', label: 'Total scans' },
                    { icon: Leaf, value: '12', label: 'Plants tracked' },
                    { icon: Flame, value: '23', label: 'Day streak' },
                    { icon: Award, value: '7', label: 'Badges' }
                ].map((stat, i) => (
                    <Card key={i} className="bg-card clay-sm">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary mb-1">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: History */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground mb-4">Scan history</h3>
                    {history.map((row, i) => (
                        <div key={i} className="bg-card p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 clay-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-background clay-inset">
                                    <Leaf className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{row.plant}</h4>
                                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{row.date}</p>
                                </div>
                            </div>
                            <Badge className={`px-4 py-1.5 border-0 rounded-full font-semibold ${
                                row.result === 'Healthy' ? 'bg-primary/20 text-primary' :
                                row.result === 'Leaf Spot' ? 'bg-amber-100 text-amber-600' :
                                'bg-red-100 text-red-500'
                            }`}>
                                {row.result}
                            </Badge>
                        </div>
                    ))}
                </div>

                {/* Right Column: Preferences */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground mb-4">Preferences</h3>
                    <Card className="bg-card clay-sm">
                        <CardContent className="p-2">
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-background/50 transition-colors">
                                <div className="flex items-center gap-3 text-foreground font-semibold">
                                    <Bell className="w-5 h-5 text-primary" />
                                    Scan reminders
                                </div>
                                <div className="w-12 h-7 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute right-1 top-1 w-5 h-5 bg-primary-foreground rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-background/50 transition-colors">
                                <div className="flex items-center gap-3 text-foreground font-semibold">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Disease alerts
                                </div>
                                <div className="w-12 h-7 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute right-1 top-1 w-5 h-5 bg-primary-foreground rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-background/50 transition-colors">
                                <div className="flex items-center gap-3 text-foreground font-semibold">
                                    <Users className="w-5 h-5 text-muted-foreground" />
                                    Community replies
                                </div>
                                <div className="w-12 h-7 bg-muted-foreground/30 rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute left-1 top-1 w-5 h-5 bg-background rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
