import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, Coffee, ShoppingBag, Smartphone, Car, Home } from 'lucide-react';
import { cn } from '../lib/utils';

const Transactions = () => {
    const [filter, setFilter] = useState('All');

    const transactions = [
        { id: 1, merchant: 'Starbucks', date: 'Today, 10:23 AM', amount: -5.50, type: 'expense', category: 'Food', icon: Coffee },
        { id: 2, merchant: 'Apple Store', date: 'Yesterday, 4:15 PM', amount: -999.00, type: 'expense', category: 'Tech', icon: Smartphone },
        { id: 3, merchant: 'Salary Deposit', date: 'Oct 28, 9:00 AM', amount: 4500.00, type: 'income', category: 'Salary', icon: ArrowDownLeft },
        { id: 4, merchant: 'Uber', date: 'Oct 27, 8:30 PM', amount: -24.50, type: 'expense', category: 'Transport', icon: Car },
        { id: 5, merchant: 'Whole Foods', date: 'Oct 26, 6:45 PM', amount: -142.80, type: 'expense', category: 'Groceries', icon: ShoppingBag },
        { id: 6, merchant: 'Electric Bill', date: 'Oct 25, 11:00 AM', amount: -120.00, type: 'expense', category: 'Utilities', icon: Home },
    ];

    const filteredTransactions = filter === 'All'
        ? transactions
        : transactions.filter(t => filter === 'Income' ? t.type === 'income' : t.type === 'expense');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Transactions</h2>
                    <p className="text-gray-400 mt-1">Your recent financial activity.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-surface hover:bg-surface-hover text-white px-4 py-2.5 rounded-xl font-medium transition-colors border border-white/5 flex items-center gap-2">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Search and Filter Tabs */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full bg-surface border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
                <div className="flex bg-surface p-1 rounded-xl border border-white/5">
                    {['All', 'Income', 'Expense'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                                filter === f ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                <div className="divide-y divide-white/5">
                    {filteredTransactions.map((t) => (
                        <div key={t.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                                    t.type === 'income' ? "bg-secondary/10 text-secondary" : "bg-white/5 text-white group-hover:bg-primary group-hover:text-white"
                                )}>
                                    <t.icon size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white">{t.merchant}</p>
                                    <p className="text-sm text-gray-500">{t.category} • {t.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "font-bold text-lg",
                                    t.type === 'income' ? "text-secondary" : "text-white"
                                )}>
                                    {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-400">
                                    Completed
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
