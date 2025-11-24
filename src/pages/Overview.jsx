import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Activity, CreditCard, DollarSign, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Overview</h2>
                    <p className="text-gray-400 mt-1">Welcome back, Alex. Your financial command center.</p>
                </div>
                <Link to="/add-money" className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95">
                    + Add Money
                </Link>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Net Worth Card (Combined) */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors md:col-span-2">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <Wallet size={20} />
                        </div>
                        <span className="text-gray-400 font-medium">Total Net Worth</span>
                    </div>
                    <div className="flex items-end gap-4 mb-2">
                        <h3 className="text-5xl font-bold text-white">$98,071.56</h3>
                        <div className="flex items-center text-secondary text-sm font-medium bg-secondary/10 px-2 py-1 rounded-lg mb-2">
                            <TrendingUp size={14} className="mr-1" />
                            +8.2%
                        </div>
                    </div>
                    <p className="text-gray-500">Cash + Investments</p>
                </div>

                {/* Monthly Spending */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-accent/20 rounded-lg text-accent">
                            <ArrowDownRight size={20} />
                        </div>
                        <span className="text-gray-400 font-medium">Monthly Spending</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">$3,402.20</h3>
                    <p className="text-gray-500 text-sm">Last 30 days</p>
                </div>
            </div>

            {/* Secondary Grid: Investments, Loans, Bills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Investments Widget */}
                <Link to="/investments" className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-secondary/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-gray-400 font-medium">Investments</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">$73,509.56</h3>
                    <div className="h-10 flex items-end gap-1 mt-4">
                        {[40, 60, 45, 70, 65, 80, 75].map((h, i) => (
                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-secondary/30 rounded-sm hover:bg-secondary transition-colors" />
                        ))}
                    </div>
                </Link>

                {/* Loans Widget */}
                <Link to="/loans" className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-gray-400 font-medium">Active Loan</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Personal Loan</h3>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Paid: $10,186</span>
                        <span>Total: $22,636</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[45%] rounded-full" />
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Next payment: Oct 15</p>
                </Link>

                {/* Bills Widget */}
                <Link to="/bills" className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                                <Zap size={20} />
                            </div>
                            <span className="text-gray-400 font-medium">Upcoming Bill</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                            <Zap size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-white">Electric Co.</p>
                            <p className="text-xs text-gray-500">Due Oct 15</p>
                        </div>
                    </div>
                    <button className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                        Pay $124.50
                    </button>
                </Link>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-surface rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Activity size={20} className="text-primary" />
                        Recent Activity
                    </h3>
                    <Link to="/transactions" className="text-sm text-primary hover:text-blue-400 transition-colors">View All</Link>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-background transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Netflix Subscription</p>
                                    <p className="text-sm text-gray-500">Entertainment • Today, 10:23 AM</p>
                                </div>
                            </div>
                            <span className="font-bold text-white">-$14.99</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
