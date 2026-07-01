import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Search, MessageSquare, Heart, Share2, Send, Leaf, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCommunityPosts, addComment, deleteCommunityPost, deleteComment } from '../services/communityService';
import { Link } from 'react-router-dom';
import { showConfirm, showError, showToast } from '../lib/swal';

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentInputs, setCommentInputs] = useState({});
    const [commentingId, setCommentingId] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await getCommunityPosts();
            if (response.status === 'success') {
                setPosts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch community posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCommentChange = (postId, value) => {
        setCommentInputs(prev => ({ ...prev, [postId]: value }));
    };

    const submitComment = async (postId) => {
        const body = commentInputs[postId];
        if (!body || !body.trim()) return;

        setCommentingId(postId);
        try {
            const res = await addComment(postId, { body });
            if (res.status === 'success') {
                // Refresh posts or just manually insert the new comment
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                fetchPosts(); // Refreshing to get the updated comments and count
            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setCommentingId(null);
        }
    };

    const handleDeletePost = async (postId) => {
        const confirmResult = await showConfirm(
            'Delete Post',
            'Are you sure you want to delete this post? The associated scan will be unshared.',
            'Yes, Delete',
            'Cancel'
        );
        if (!confirmResult.isConfirmed) return;

        try {
            const res = await deleteCommunityPost(postId);
            if (res.status === 'success') {
                showToast('Post deleted successfully!', 'success');
                fetchPosts();
            } else {
                showError('Deletion Failed', res.message || 'Failed to delete post.');
            }
        } catch (err) {
            console.error("Failed to delete post", err);
            showError('Deletion Failed', 'An error occurred while deleting. Please try again.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmResult = await showConfirm(
            'Delete Comment',
            'Are you sure you want to delete this comment?',
            'Yes, Delete',
            'Cancel'
        );
        if (!confirmResult.isConfirmed) return;

        try {
            const res = await deleteComment(commentId);
            if (res.status === 'success') {
                showToast('Comment deleted successfully!', 'success');
                fetchPosts();
            } else {
                showError('Deletion Failed', res.message || 'Failed to delete comment.');
            }
        } catch (err) {
            console.error("Failed to delete comment", err);
            showError('Deletion Failed', 'An error occurred while deleting. Please try again.');
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Community</h1>
                    <p className="text-muted-foreground mt-1">Connect, share, and learn with other growers.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        className="w-full bg-background border-none rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 clay-inset"
                    />
                </div>
            </div>

            {/* Hint Box */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-xl text-primary">
                        <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary">Want to share?</h4>
                        <p className="text-sm text-foreground/80">Scan a plant and click "Share to Community" from the result page!</p>
                    </div>
                </div>
                <Link to="/scan" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-xl text-sm transition-all clay-primary">
                    Scan Now
                </Link>
            </div>

            {/* Feed */}
            <div className="space-y-8">
                {loading ? (
                    <div className="text-center text-muted-foreground p-8">Loading posts...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-muted-foreground p-8">Belum ada post di komunitas.</div>
                ) : posts.map(post => (
                    <Card key={post.id} className="bg-card border-none clay-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-6 sm:p-8 space-y-5">
                            {/* Post Header */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg clay-primary shrink-0">
                                        {post.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <h3 className="text-foreground font-bold text-lg">{post.user?.name || 'User'}</h3>
                                        <div className="flex items-center gap-2 text-sm mt-0.5">
                                            <span className="text-primary font-semibold capitalize">{post.user?.role || 'Member'}</span>
                                            <span className="text-muted-foreground/40">•</span>
                                            <span className="text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                {(post.user_id === user?.id || user?.role === 'admin') && (
                                    <button 
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-500/10 shrink-0"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Post Content */}
                            <div className="space-y-4">
                                {post.caption && (
                                    <p className="text-foreground/90 leading-relaxed text-[15px]">{post.caption}</p>
                                )}
                                
                                {post.scan_result && (
                                    <div className="rounded-2xl overflow-hidden border border-border clay-inset bg-background flex flex-col sm:flex-row gap-4 p-4">
                                        <img src={post.scan_result.image_url} alt="Scan result" className="w-full sm:w-32 sm:h-32 object-cover rounded-xl shrink-0" />
                                        <div className="space-y-2 flex-1">
                                            <div className="font-semibold text-foreground">Scan Result</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">Disease:</span>
                                                <span className="font-medium">{post.scan_result.disease_label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">Severity:</span>
                                                <span className="font-medium">{post.scan_result.severity_label || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Comments Section */}
                            <div className="pt-4 border-t border-border space-y-4">
                                <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> 
                                    Comments ({post.comments_count || 0})
                                </h4>
                                
                                {post.comments && post.comments.length > 0 && (
                                    <div className="space-y-3">
                                        {post.comments.map(comment => (
                                            <div key={comment.id} className="bg-muted/30 p-3 rounded-xl clay-inset border border-border flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm text-foreground">{comment.user?.name || 'User'}</span>
                                                        <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-sm text-foreground/80">{comment.body}</p>
                                                </div>
                                                {(comment.user_id === user?.id || post.user_id === user?.id || user?.role === 'admin') && (
                                                    <button 
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-500/10 shrink-0 mt-0.5"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Comment */}
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment..."
                                        value={commentInputs[post.id] || ''}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                                        className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 clay-inset"
                                    />
                                    <button 
                                        onClick={() => submitComment(post.id)}
                                        disabled={commentingId === post.id || !commentInputs[post.id]?.trim()}
                                        className="bg-primary text-primary-foreground p-2 rounded-xl clay-primary disabled:opacity-50"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Community;
