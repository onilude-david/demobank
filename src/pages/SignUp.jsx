import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate signup
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">VAULT</h1>
                    <p className="text-gray-400">Create your account to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Alex Morgan"
                                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

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

                    <div className="pt-2">
                        <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                            Create Account
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-white font-bold hover:text-primary transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
