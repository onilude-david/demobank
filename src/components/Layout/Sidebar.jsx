import React from 'react';
import { Home, CreditCard, PieChart, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: <Home size={20} />, label: 'Overview', active: true },
        { icon: <CreditCard size={20} />, label: 'Transactions', active: false },
        { icon: <PieChart size={20} />, label: 'Analytics', active: false },
        { icon: <Settings size={20} />, label: 'Settings', active: false },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-full bg-surface border-r border-surface-hover p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Noble Trust Bank</h1>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-400 hover:bg-surface-hover hover:text-white'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="pt-4 border-t border-surface-hover">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-hover hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
