import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScanDetail, deleteScan } from '../services/scanService';
import { createCommunityPost } from '../services/communityService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Share2, Leaf, AlertTriangle, ShieldCheck, Trash2 } from 'lucide-react';
import { showConfirm, showError, showToast } from '../lib/swal';

const ScanResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scan, setScan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sharing, setSharing] = useState(false);
    const [caption, setCaption] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        const fetchScan = async () => {
            try {
                const res = await getScanDetail(id);
                if (res.status === 'success') {
                    setScan(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch scan detail", err);
            } finally {
                setLoading(false);
            }
        };
        fetchScan();
    }, [id]);

    const handleShare = async () => {
        if (!caption.trim()) return;

        const confirmResult = await showConfirm(
            'Share Scan',
            'Are you sure you want to share this scan to the community?',
            'Yes, Share',
            'Cancel'
        );
        if (!confirmResult.isConfirmed) return;

        setSharing(true);
        try {
            const res = await createCommunityPost({ scan_result_id: id, caption });
            if (res.status === 'success') {
                setScan(prev => ({ ...prev, is_shared: true }));
                setShowShareModal(false);
                setCaption("");
                showToast('Successfully shared to community!', 'success');
            } else {
                showError('Sharing Failed', res.message || 'Failed to share the scan result to community.');
            }
        } catch (err) {
            console.error("Failed to share", err);
            showError('Sharing Failed', 'An error occurred while sharing. Please try again.');
        } finally {
            setSharing(false);
        }
    };

    const handleDelete = async () => {
        const confirmResult = await showConfirm(
            'Delete Scan',
            'Are you sure you want to delete this scan history? This action cannot be undone.',
            'Yes, Delete',
            'Cancel'
        );
        if (!confirmResult.isConfirmed) return;

        try {
            const res = await deleteScan(id);
            if (res.status === 'success') {
                showToast('Scan deleted successfully!', 'success');
                navigate('/dashboard');
            } else {
                showError('Deletion Failed', res.message || 'Failed to delete the scan result.');
            }
        } catch (err) {
            console.error("Failed to delete", err);
            showError('Deletion Failed', 'An error occurred while deleting. Please try again.');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
    }

    if (!scan) {
        return <div className="p-8 text-center text-muted-foreground">Scan not found.</div>;
    }

    const isHealthy = scan.disease_label.toLowerCase() === 'healthy';

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden clay-sm border border-border">
                        <img src={scan.image_url} alt="Scan Result" className="w-full h-auto object-cover" />
                    </div>
                    
                    {!scan.is_shared && (
                        <button 
                            onClick={() => setShowShareModal(true)}
                            className="w-full bg-card hover:bg-muted text-foreground font-semibold py-3 rounded-xl transition-all border border-border clay-inset flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Share to Community
                        </button>
                    )}
                    {scan.is_shared && (
                        <div className="text-center text-sm font-medium text-muted-foreground p-3 bg-muted/30 rounded-xl">
                            Already shared to community
                        </div>
                    )}
                    
                    <button 
                        onClick={handleDelete}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3 rounded-xl transition-all border border-red-500/20 clay-inset flex items-center justify-center gap-2 mt-4"
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete Scan
                    </button>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <Card className="bg-card clay-sm">
                        <CardHeader className="pb-3 border-b border-border">
                            <CardTitle className="text-xl flex justify-between items-center">
                                Analysis Result
                                <Badge className={
                                    isHealthy ? 'bg-primary/10 text-primary border-0' :
                                    scan.severity_label === 'Sedang' ? 'bg-amber-500/10 text-amber-500 border-0' :
                                    'bg-red-500/10 text-red-500 border-0'
                                }>
                                    {scan.severity_label || 'Safe'}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Disease Detected</h3>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    {isHealthy ? <ShieldCheck className="w-6 h-6 text-primary" /> : <AlertTriangle className="w-6 h-6 text-red-500" />}
                                    {scan.disease_label}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Confidence: {Math.round(scan.disease_confidence * 100)}%
                                </p>
                            </div>
                            
                            {scan.notes && (
                                <div className="pt-4 border-t border-border">
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                                    <p className="text-foreground">{scan.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {scan.recommendations && scan.recommendations.length > 0 && (
                        <Card className="bg-card clay-sm">
                            <CardHeader className="pb-3 border-b border-border">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-primary" />
                                    Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                {scan.recommendations.map((rec, i) => (
                                    <div key={i} className="space-y-2">
                                        <div>
                                            <h4 className="font-bold text-foreground">Action</h4>
                                            <p className="text-sm text-muted-foreground">{rec.action}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Prevention</h4>
                                            <p className="text-sm text-muted-foreground">{rec.prevention}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-md clay-sm space-y-4">
                        <h3 className="text-xl font-bold">Share to Community</h3>
                        <p className="text-sm text-muted-foreground">Ask for advice or share your plant's progress.</p>
                        <textarea 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className="w-full p-3 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-none focus:border-primary min-h-25 resize-none"
                        />
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setShowShareModal(false)}
                                className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleShare}
                                disabled={sharing || !caption.trim()}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold clay-primary disabled:opacity-50"
                            >
                                {sharing ? 'Sharing...' : 'Share'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanResult;
