import { AlertCircle, ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const navigate = useNavigate();
    const { login, loading: authLoading, error: authError } = useAuth();
    const emailId = useId();
    const passwordId = useId();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLocalError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setLocalError('Password must be at least 6 characters.');
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
        // On API failure: authError is set in context → triggers re-render → displayError shows it
    };

    const displayError = localError || authError;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">NOBLE TRUST</h1>
                    <p className="text-gray-400">Welcome back! Please sign in to continue.</p>
                </div>

                {displayError && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                        <AlertCircle size={16} className="shrink-0" />
                        {displayError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="space-y-2">
                        <label htmlFor={emailId} className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Mail size={20} />
                            </div>
                            <input
                                id={emailId}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@example.com"
                                autoComplete="email"
                                disabled={authLoading}
                                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor={passwordId} className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Lock size={20} />
                            </div>
                            <input
                                id={passwordId}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                disabled={authLoading}
                                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary" />
                            <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <button type="button" className="text-primary hover:text-blue-400 transition-colors">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={authLoading}
                        className="w-full bg-primary hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                    >
                        {authLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
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
