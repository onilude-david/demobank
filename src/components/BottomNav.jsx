import { ArrowRightLeft, LayoutDashboard, Settings, Wallet, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: ArrowRightLeft, label: 'Transfers', path: '/transactions' },
    { icon: Wallet, label: 'Cards', path: '/my-bank' },
    { icon: Zap, label: 'Bills', path: '/bills' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-white/5 z-50">
        <div className="flex justify-around items-center px-2 py-2">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                        'flex flex-col items-center justify-center gap-1 px-1 sm:px-3 py-2 rounded-xl transition-all min-w-[50px] sm:min-w-[56px]',
                        isActive ? 'text-primary' : 'text-gray-500'
                    )}
                >
                    {({ isActive }) => (
                        <>
                            <item.icon size={21} className={isActive ? 'text-primary' : ''} />
                            <span className={cn('text-[10px] font-medium', isActive ? 'text-primary' : 'text-gray-500')}>{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    </div>
);

export default BottomNav;
