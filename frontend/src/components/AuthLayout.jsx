import React from 'react';
import { Leaf, ScanLine, Lightbulb, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="min-h-screen bg-background flex text-foreground font-sans">

            {/* Left side */}
            <div className="hidden lg:flex w-1/2 animated-gradient border-r border-border flex-col p-12 justify-between relative overflow-hidden">

                {/* Floating Background */}
                <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#b7d79a]/35 blur-[90px] animate-float"></div>

                <div className="absolute bottom-[-100px] left-[-60px] w-[360px] h-[360px] rounded-full bg-[#dcebc8]/50 blur-[100px] animate-float-slow"></div>

                <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/30 blur-[120px] animate-glow"></div>

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm clay-sm flex items-center justify-center">
                        <img
                            src="/logo.jpg"
                            alt="Tanamind Logo"
                            className="w-9 h-9 object-cover rounded-xl"
                        />
                    </div>

                    <span className="text-2xl font-black tracking-tight">
                        <span className="text-foreground">Tana</span>
                        <span className="text-primary">mind</span>
                    </span>
                </div>

                {/* Hero */}
                <div className="space-y-6 relative z-10">
                    <h1 className="text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                        Keep your bok choy{" "}
                        <span className="text-primary">
                            happy &amp; healthy
                        </span>
                        .
                    </h1>

                    <p className="text-muted-foreground text-lg max-w-md">
                        Snap a photo of a leaf and our machine-learning model
                        spots diseases early — so you can act before they
                        spread.
                    </p>

                    <ul className="space-y-4 mt-10 max-w-md">
                        {[
                            {
                                title: "AI leaf scanning",
                                desc: "Instant disease detection",
                                icon: ScanLine,
                            },
                            {
                                title: "Smart care tips",
                                desc: "Tailored treatment advice",
                                icon: Lightbulb,
                            },
                            {
                                title: "Grower community",
                                desc: "Learn from other farmers",
                                icon: Users,
                            },
                        ].map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-4 rounded-2xl bg-white/75 p-4 backdrop-blur-sm border border-green-100/80 shadow-[0_15px_35px_rgba(92,155,58,0.30)] hover:shadow-[0_25px_45px_rgba(92,155,58,0.35)] transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                    <feature.icon className="w-5 h-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-foreground text-sm">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground text-xs">
                                        {feature.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-sm text-muted-foreground relative z-10 flex items-center gap-2 font-semibold">
                    Growing smarter, one leaf at a time
                    <Leaf className="w-4 h-4 text-primary" />
                </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-background">

                <div className="w-full max-w-md bg-card p-10 rounded-3xl clay-md border-none">

                    <div className="flex w-full bg-background p-1.5 rounded-2xl mb-8 clay-inset">
                        <Link
                            to="/login"
                            className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                isLogin
                                    ? "bg-card text-foreground clay-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Log in
                        </Link>

                        <Link
                            to="/register"
                            className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                !isLogin
                                    ? "bg-card text-foreground clay-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Sign up
                        </Link>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            {isLogin
                                ? "Welcome back!"
                                : "Create your account"}
                        </h2>

                        <p className="text-sm text-muted-foreground mt-1">
                            {isLogin
                                ? "Log in to continue scanning."
                                : "Sign up to start scanning your plants."}
                        </p>
                    </div>

                    {children}

                    {isLogin && (
                        <p className="text-xs text-muted-foreground text-center mt-6">
                            Tip: log in with an email starting with{" "}
                            <span className="font-bold text-foreground">
                                admin
                            </span>{" "}
                            to see the admin dashboard.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;