import { LayoutDashboard, LogOut, Settings, TrendingUp, Wallet, Zap, DollarSign, ArrowRightLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Wallet, label: 'My Bank', path: '/my-bank' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/transactions' },
    { icon: DollarSign, label: 'Loans', path: '/loans' },
    { icon: TrendingUp, label: 'Investments', path: '/investments' },
    { icon: Zap, label: 'Bill Pay', path: '/bills' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-background border-r border-white/5 fixed left-0 top-0 z-50">
            <div className="px-6 py-7 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="text-white font-black text-sm">N</span>
                </div>
                <h1 className="text-xl font-black text-white tracking-tight">NOBLE TRUST</h1>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 relative',
                            isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
                                )}
                                <item.icon size={18} className={cn('shrink-0', isActive && 'text-primary')} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-white/5 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user?.initials ?? '??'}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email ?? ''}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-150 text-sm font-medium"
                >
                    <LogOut size={18} className="shrink-0" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
