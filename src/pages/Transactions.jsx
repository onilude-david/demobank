import { useState, useMemo } from 'react';
import { Search, Coffee, ShoppingBag, Smartphone, Car, Home, CreditCard, ArrowDownLeft, ArrowRightLeft, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

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

const FILTERS = ['All', 'Income', 'Expense'];

const Transactions = () => {
    const { transactions, loadingData } = useApp();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        let list = transactions;
        if (filter === 'Income') list = list.filter(t => t.type === 'income');
        if (filter === 'Expense') list = list.filter(t => t.type === 'expense');
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(t =>
                t.merchant.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        }
        return list;
    }, [transactions, filter, search]);

    const fmt = (n) => Math.abs(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white">Transactions</h2>
                <p className="text-gray-400 mt-1">Your complete financial history.</p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by merchant or category..."
                        className="w-full bg-surface border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
                <div className="flex bg-surface p-1 rounded-xl border border-white/5 shrink-0">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                'px-5 py-2 rounded-lg text-sm font-medium transition-all',
                                filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                {loadingData ? (
                    <div className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                                <div className="w-11 h-11 rounded-full bg-white/5 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-36 bg-white/5 rounded" />
                                    <div className="h-3 w-24 bg-white/5 rounded" />
                                </div>
                                <div className="h-5 w-16 bg-white/5 rounded" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <TrendingDown size={40} className="text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No transactions found</p>
                        {search && <p className="text-gray-600 text-sm mt-1">Try a different search term</p>}
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filtered.map(t => {
                            const Icon = getCategoryIcon(t.category);
                            const isIncome = t.type === 'income';
                            return (
                                <div key={t.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors group cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            'w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors',
                                            isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                                        )}>
                                            <Icon size={19} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{t.merchant}</p>
                                            <p className="text-xs text-gray-500">{t.category} · {t.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn('text-sm font-bold', isIncome ? 'text-emerald-400' : 'text-white')}>
                                            {isIncome ? '+' : '-'}{fmt(t.amount)}
                                        </p>
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {!loadingData && filtered.length > 0 && (
                <p className="text-center text-xs text-gray-600">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</p>
            )}
        </div>
    );
};

export default Transactions;
