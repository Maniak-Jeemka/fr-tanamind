import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Scan, Leaf, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { getScanHistory } from '../services/scanService';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getScanHistory();
                if (response.status === 'success') {
                    setScans(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch scan history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
                        Hi {user?.name || 'User'} <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Here is your scan history.</p>
                </div>
                <button onClick={() => navigate('/scan')} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold clay-primary hover:bg-primary/90 transition-all">
                    <Scan className="w-5 h-5" />
                    New scan
                </button>
            </div>

            <Card className="bg-card border-border clay-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Scan History
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="text-center text-muted-foreground py-8">Loading history...</div>
                    ) : scans.length === 0 ? (
                        <div className="text-center flex flex-col items-center justify-center text-muted-foreground py-12">
                            <Leaf className="w-12 h-12 mb-4 opacity-50" />
                            <p>You haven't scanned any plants yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {scans.map((scan) => (
                                <Link to={`/scan/${scan.id}`} key={scan.id} className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/60 rounded-xl transition-colors cursor-pointer group border border-border clay-inset">
                                    <div className="flex items-center gap-4">
                                        <img src={scan.image_url} alt="Scan result" className="w-16 h-16 rounded-lg object-cover bg-background" />
                                        <div>
                                            <h4 className="text-foreground font-bold group-hover:text-primary transition-colors">{scan.disease_label}</h4>
                                            <p className="text-sm font-medium text-muted-foreground mt-0.5">{new Date(scan.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={
                                            scan.disease_label.toLowerCase() === 'healthy' 
                                                ? 'bg-primary/10 text-primary border-0 px-3 py-1 text-sm' 
                                                : scan.severity_label === 'Sedang' 
                                                    ? 'bg-amber-500/10 text-amber-500 border-0 px-3 py-1 text-sm' 
                                                    : 'bg-red-500/10 text-red-500 border-0 px-3 py-1 text-sm'
                                        }>
                                            {scan.severity_label || 'Safe'}
                                        </Badge>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
