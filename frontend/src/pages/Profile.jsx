import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { Mail, MapPin } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Profile</h1>
            </div>

            <Card className="bg-card clay-sm">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-24 h-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold shrink-0 clay-primary">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h2 className="text-2xl font-bold text-foreground">{user?.name || 'User'}</h2>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 px-3 capitalize">
                                {user?.role || 'Member'}
                            </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email || 'user@example.com'}</span>
                        </div>
                        {user?.created_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Member since: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
