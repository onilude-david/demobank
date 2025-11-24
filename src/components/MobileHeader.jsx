import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Wallet, ArrowRightLeft, DollarSign, TrendingUp, Zap, Settings, LogOut } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-b border-white/10 z-50 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary tracking-tighter">VAULT</h1>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <X size={24} className="text-white" />
                        ) : (
                            <Menu size={24} className="text-white" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-surface border-l border-white/10 z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-primary">Menu</h2>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link
                        to="/signin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MobileHeader;
