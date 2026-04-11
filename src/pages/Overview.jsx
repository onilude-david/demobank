import { ArrowDownLeft, ArrowUpRight, Coffee, ShoppingBag, Smartphone, Car, Home, CreditCard, TrendingUp, DollarSign, Zap, ChevronRight, Plus, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const CATEGORY_ICONS = {
    Food: Coffee,
    Tech: Smartphone,
    Salary: ArrowDownLeft,
    Transport: Car,
    Groceries: ShoppingBag,
    Utilities: Home,
    Bills: Home,
    Transfer: ArrowRightLeft,
    Deposit: ArrowDownLeft,
    Entertainment: CreditCard,
};

const getCategoryIcon = (category) => CATEGORY_ICONS[category] ?? CreditCard;

const StatCard = ({ label, value, sub, accent, children }) => (
    <div className={`bg-surface rounded-2xl border border-white/5 p-6 hover:border-${accent}/30 transition-colors relative overflow-hidden group`}>
        {children}
        <p className="text-gray-400 text-sm font-medium mb-3">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
    </div>
);

const Overview = () => {
    const { user } = useAuth();
    const { balance, transactions, loadingData } = useApp();

    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + parseFloat(t.amount), 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(parseFloat(t.amount)), 0);
    const recent = transactions.slice(0, 5);

    const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Good day,</p>
                    <h2 className="text-3xl font-bold text-white">{user?.name ?? 'Welcome back'}</h2>
                </div>
                <div className="flex gap-2">
                    <Link to="/transfer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all border border-white/5">
                        <ArrowRightLeft size={16} /> Transfer
                    </Link>
                    <Link to="/add-money"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-sm font-medium transition-all shadow-lg shadow-primary/20">
                        <Plus size={16} /> Add Money
                    </Link>
                </div>
            </div>

            {/* Balance Hero */}
            <div className="bg-gradient-to-br from-primary/20 via-surface to-surface rounded-2xl border border-primary/10 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium mb-2">Total Balance</p>
                    {loadingData ? (
                        <div className="h-14 w-48 bg-white/5 animate-pulse rounded-xl" />
                    ) : (
                        <h3 className="text-5xl font-black text-white tracking-tight">{fmt(balance)}</h3>
                    )}
                    <p className="text-gray-500 text-sm mt-2">Vault Checking Account</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface rounded-2xl border border-white/5 p-5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <ArrowDownLeft size={16} className="text-emerald-400" />
                        </div>
                        <span className="text-gray-400 text-sm font-medium">Total Income</span>
                    </div>
                    {loadingData
                        ? <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg" />
                        : <p className="text-2xl font-bold text-emerald-400">{fmt(income)}</p>
                    }
                </div>
                <div className="bg-surface rounded-2xl border border-white/5 p-5 hover:border-red-500/20 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <ArrowUpRight size={16} className="text-red-400" />
                        </div>
                        <span className="text-gray-400 text-sm font-medium">Total Expenses</span>
                    </div>
                    {loadingData
                        ? <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg" />
                        : <p className="text-2xl font-bold text-red-400">{fmt(expenses)}</p>
                    }
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/investments" className="bg-surface rounded-2xl border border-white/5 hover:border-emerald-500/30 p-5 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp size={18} className="text-emerald-400" />
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm">Investments</p>
                    <p className="text-xl font-bold text-white mt-1">$73,509</p>
                    <p className="text-emerald-400 text-xs font-medium mt-1">+2.4% today</p>
                </Link>

                <Link to="/loans" className="bg-surface rounded-2xl border border-white/5 hover:border-purple-500/30 p-5 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <DollarSign size={18} className="text-purple-400" />
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm">Active Loan</p>
                    <p className="text-xl font-bold text-white mt-1">$12,450</p>
                    <div className="mt-2 h-1.5 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[45%] rounded-full" />
                    </div>
                </Link>

                <Link to="/bills" className="bg-surface rounded-2xl border border-white/5 hover:border-yellow-500/30 p-5 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Zap size={18} className="text-yellow-400" />
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm">Upcoming Bill</p>
                    <p className="text-xl font-bold text-white mt-1">$124.50</p>
                    <p className="text-yellow-400 text-xs font-medium mt-1">Due Oct 15</p>
                </Link>
            </div>

            {/* Recent Transactions */}
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <h3 className="text-base font-bold text-white">Recent Activity</h3>
                    <Link to="/transactions" className="text-sm text-primary hover:text-blue-400 transition-colors font-medium">
                        View All
                    </Link>
                </div>

                {loadingData ? (
                    <div className="divide-y divide-white/5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-32 bg-white/5 rounded" />
                                    <div className="h-3 w-24 bg-white/5 rounded" />
                                </div>
                                <div className="h-4 w-16 bg-white/5 rounded" />
                            </div>
                        ))}
                    </div>
                ) : recent.length === 0 ? (
                    <div className="py-16 text-center text-gray-500">No transactions yet</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {recent.map((t) => {
                            const Icon = getCategoryIcon(t.category);
                            const isIncome = t.type === 'income';
                            const amt = parseFloat(t.amount);
                            return (
                                <div key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{t.merchant}</p>
                                            <p className="text-xs text-gray-500">{t.category} · {t.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold ${isIncome ? 'text-emerald-400' : 'text-white'}`}>
                                        {isIncome ? '+' : ''}{fmt(Math.abs(amt))}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overview;
