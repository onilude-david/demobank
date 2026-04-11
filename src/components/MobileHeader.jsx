import { useState } from 'react';
import { Menu, X, LayoutDashboard, Wallet, ArrowRightLeft, DollarSign, TrendingUp, Zap, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Wallet, label: 'My Bank', path: '/my-bank' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/transactions' },
    { icon: DollarSign, label: 'Loans', path: '/loans' },
    { icon: TrendingUp, label: 'Investments', path: '/investments' },
    { icon: Zap, label: 'Bill Pay', path: '/bills' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const MobileHeader = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-b border-white/5 z-50 px-5 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="text-white font-black text-xs">V</span>
                        </div>
                        <h1 className="text-lg font-black text-white tracking-tight">VAULT</h1>
                    </div>
                    <button onClick={() => setOpen(!open)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        {open ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
                    </button>
                </div>
            </header>

            {/* Backdrop */}
            {open && (
                <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
            )}

            {/* Drawer */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-surface border-l border-white/5 z-50 transform transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            {user?.initials ?? '??'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{user?.name ?? 'User'}</p>
                            <p className="text-xs text-gray-500">{user?.email ?? ''}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
                            }
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={() => { setOpen(false); logout(); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileHeader;
