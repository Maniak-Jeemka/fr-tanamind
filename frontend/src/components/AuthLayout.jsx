import React from 'react';
import { Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="min-h-screen bg-background flex text-foreground font-sans">
            {/* Left side: Promotional Banner */}
            <div className="hidden lg:flex w-1/2 bg-linear-to-br from-[#eaf2e3] to-[#d2e3c8] border-r border-border flex-col p-12 justify-between relative overflow-hidden">
                
                {/* Logo Area */}
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm clay-sm flex items-center justify-center">
                        <img src="/logo.jpg" alt="Tanamind Logo" className="w-9 h-9 object-cover rounded-xl" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">Tanamind</span>
                </div>

                {/* Main Copy */}
                <div className="space-y-6 relative z-10">
                    <h1 className="text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                        Keep your pak choy <span className="text-primary">happy & healthy</span>.
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md">
                        Snap a photo of a leaf and our machine-learning model spots diseases early — so you can act before they spread.
                    </p>

                    {/* Feature Pills */}
                    <ul className="space-y-4 mt-10 max-w-md">
                        {[
                            { title: 'AI leaf scanning', desc: 'Instant disease detection' },
                            { title: 'Smart care tips', desc: 'Tailored treatment advice' },
                            { title: 'Grower community', desc: 'Learn from other farmers' }
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-sm transition-transform hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                                    <p className="text-muted-foreground text-xs">{feature.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-sm text-muted-foreground relative z-10 flex items-center gap-2">
                    Growing smarter, one leaf at a time <Leaf className="w-4 h-4 text-primary" />
                </div>
            </div>

            {/* Right side: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-background">
                <div className="w-full max-w-md bg-card p-10 rounded-3xl clay-md border-none">
                    {/* Tabs */}
                    <div className="flex w-full bg-background p-1.5 rounded-2xl mb-8 clay-inset">
                        <Link 
                            to="/login"
                            className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${isLogin ? 'bg-card text-foreground clay-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Log in
                        </Link>
                        <Link 
                            to="/register"
                            className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${!isLogin ? 'bg-card text-foreground clay-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sign up
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
