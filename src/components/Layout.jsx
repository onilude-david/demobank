import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';

const Layout = () => {
    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Sidebar />
            <MobileHeader />

            {/* Main Content Area */}
            <main className="md:pl-64 min-h-screen pb-24 md:pb-8 pt-20 md:pt-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default Layout;
