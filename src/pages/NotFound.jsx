import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />

        <div className="text-center max-w-md relative z-10">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass size={48} />
            </div>
            <p className="text-8xl font-black text-white/10 mb-0">404</p>
            <h2 className="text-2xl font-bold text-white mb-3 -mt-6">Page Not Found</h2>
            <p className="text-gray-400 mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
                <Home size={18} />
                Back to Dashboard
            </Link>
        </div>
    </div>
);

export default NotFound;
