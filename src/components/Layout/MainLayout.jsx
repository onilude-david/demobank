import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full bg-background text-white overflow-hidden">
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto relative">
                <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
