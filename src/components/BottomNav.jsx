import React from 'react';
import { LayoutDashboard, Wallet, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

const BottomNav = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: Wallet, label: 'My Bank', path: '/cards' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-surface z-50 px-6 py-4">
            <div className="flex justify-between items-center">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center space-y-1 transition-colors",
                            isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        <item.icon size={24} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
