import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const SignIn = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">VAULT</h1>
                    <p className="text-gray-400">Welcome back! Please sign in to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="alex@example.com"
                                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary focus:ring-offset-background focus:ring-primary" />
                            <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:text-blue-400 transition-colors">Forgot Password?</a>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                        Sign In
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-white font-bold hover:text-primary transition-colors">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
