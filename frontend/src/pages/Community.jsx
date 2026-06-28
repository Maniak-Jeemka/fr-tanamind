import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Search, Image as ImageIcon, MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Community = () => {
    const { user } = useAuth();

    const posts = [
        {
            id: 1,
            author: 'Budi Santoso',
            role: 'Expert Grower',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
            time: '2 hours ago',
            content: 'Just successfully treated my tomato plants for leaf spot using the recommendations from Tanamind! The copper fungicide worked wonders after just a week.',
            image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=400&fit=crop',
            likes: 24,
            comments: 5
        },
        {
            id: 2,
            author: 'Siti Aminah',
            role: 'Beginner',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
            time: '5 hours ago',
            content: 'Does anyone know why my Monstera leaves are turning yellow at the edges? The scan says it might be overwatering, but I only water once a week.',
            likes: 12,
            comments: 18
        }
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Community</h1>
                    <p className="text-muted-foreground mt-1">Connect, share, and learn with other growers.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 clay-inset"
                    />
                </div>
            </div>

            {/* Create Post */}
            <Card className="bg-card border-border clay-sm">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full bg-muted object-cover" />
                        <div className="flex-1 space-y-4">
                            <textarea 
                                placeholder="Share an update, ask a question, or post a scan result..." 
                                className="w-full bg-muted/30 border border-border rounded-xl p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-25 clay-inset"
                            ></textarea>
                            <div className="flex items-center justify-between">
                                <button className="flex items-center gap-2 text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
                                    <ImageIcon className="w-4 h-4" />
                                    Add Photo
                                </button>
                                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 rounded-lg transition-all clay-primary text-sm">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feed */}
            <div className="space-y-6">
                {posts.map(post => (
                    <Card key={post.id} className="bg-card border-border clay-sm">
                        <CardContent className="p-6">
                            {/* Post Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-muted object-cover" />
                                    <div>
                                        <h3 className="text-foreground font-semibold">{post.author}</h3>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-primary font-medium">{post.role}</span>
                                            <span className="text-muted-foreground">•</span>
                                            <span className="text-muted-foreground">{post.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Post Content */}
                            <div className="space-y-4">
                                <p className="text-foreground leading-relaxed">{post.content}</p>
                                {post.image && (
                                    <div className="rounded-xl overflow-hidden border border-border">
                                        <img src={post.image} alt="Post media" className="w-full h-auto object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Post Actions */}
                            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
                                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm font-medium">
                                    <Heart className="w-5 h-5 group-hover:fill-primary/20" />
                                    {post.likes}
                                </button>
                                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                                    <MessageSquare className="w-5 h-5" />
                                    {post.comments}
                                </button>
                                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium ml-auto">
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Community;
