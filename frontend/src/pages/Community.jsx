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
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        className="w-full bg-background border-none rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 clay-inset"
                    />
                </div>
            </div>

            {/* Create Post */}
            <Card className="bg-card border-none clay-sm rounded-3xl overflow-hidden mb-8">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} alt="User" className="w-12 h-12 rounded-full bg-background clay-inset object-cover shrink-0 p-1" />
                        <div>
                            <h3 className="text-foreground font-bold text-lg">{user?.name || 'Admin'}</h3>
                            <p className="text-primary font-medium text-sm">Create a new post</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <textarea 
                            placeholder="Share an update, ask a question, or post a scan result..." 
                            className="w-full bg-background border-none rounded-2xl p-5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-35 clay-inset text-[15px] leading-relaxed"
                        ></textarea>
                        <div className="flex items-center justify-between pt-2">
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary bg-background clay-sm px-5 py-2.5 rounded-xl transition-all text-sm font-semibold active:translate-y-0.5">
                                <ImageIcon className="w-5 h-5" />
                                Add Photo
                            </button>
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-2.5 rounded-xl transition-all clay-primary text-sm active:translate-y-0.5">
                                Post
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feed */}
            <div className="space-y-8">
                {posts.map(post => (
                    <Card key={post.id} className="bg-card border-none clay-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-6 sm:p-8">
                            {/* Post Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full bg-background clay-inset object-cover p-1 shrink-0" />
                                    <div>
                                        <h3 className="text-foreground font-bold text-lg">{post.author}</h3>
                                        <div className="flex items-center gap-2 text-sm mt-0.5">
                                            <span className="text-primary font-semibold">{post.role}</span>
                                            <span className="text-muted-foreground/40">•</span>
                                            <span className="text-muted-foreground">{post.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-muted-foreground hover:text-primary p-2 rounded-xl bg-background clay-sm transition-all active:translate-y-0.5">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Post Content */}
                            <div className="space-y-5">
                                <p className="text-foreground/90 leading-relaxed text-[15px]">{post.content}</p>
                                {post.image && (
                                    <div className="rounded-2xl overflow-hidden clay-inset p-2 bg-background">
                                        <img src={post.image} alt="Post media" className="w-full h-auto object-cover rounded-xl" />
                                    </div>
                                )}
                            </div>

                            {/* Post Actions */}
                            <div className="flex items-center gap-2 sm:gap-6 mt-8 pt-6 border-t border-black/5">
                                <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 text-muted-foreground hover:text-primary bg-background clay-sm px-4 py-2.5 rounded-xl transition-all text-sm font-semibold active:translate-y-0.5 group">
                                    <Heart className="w-4 h-4 group-hover:fill-primary/20" />
                                    {post.likes}
                                </button>
                                <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 text-muted-foreground hover:text-primary bg-background clay-sm px-4 py-2.5 rounded-xl transition-all text-sm font-semibold active:translate-y-0.5">
                                    <MessageSquare className="w-4 h-4" />
                                    {post.comments}
                                </button>
                                <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 text-muted-foreground hover:text-primary bg-background clay-sm px-4 py-2.5 rounded-xl transition-all text-sm font-semibold active:translate-y-0.5 sm:ml-auto">
                                    <Share2 className="w-4 h-4" />
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
