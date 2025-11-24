import React from 'react';
import { Home, CreditCard, PieChart, Settings } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { icon: <Home size={24} />, label: 'Overview', active: true },
        { icon: <CreditCard size={24} />, label: 'Cards', active: false },
        { icon: <PieChart size={24} />, label: 'Stats', active: false },
        { icon: <Settings size={24} />, label: 'Settings', active: false },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-hover px-6 py-3 flex justify-between items-center z-50">
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-gray-400'
                        }`}
                >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNav;
