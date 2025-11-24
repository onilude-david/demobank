import React from 'react';
import { LayoutDashboard, Wallet, ArrowRightLeft, Settings, LogOut, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: Wallet, label: 'My Bank', path: '/cards' },
        { icon: ArrowRightLeft, label: 'Transactions', path: '/transactions' },
        { icon: DollarSign, label: 'Loans', path: '/loans' },
        { icon: TrendingUp, label: 'Investments', path: '/investments' },
        { icon: Zap, label: 'Bill Pay', path: '/bills' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-background border-r border-surface fixed left-0 top-0 z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary tracking-tighter">VAULT</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-gray-400 hover:bg-surface hover:text-white"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={20} className={cn("mr-3", isActive && "text-primary")} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-surface">
                <Link to="/signin" className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-surface">
                    <LogOut size={20} className="mr-3" />
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
