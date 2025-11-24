import React from 'react';
import { TrendingUp, TrendingDown, Bitcoin, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const Investments = () => {
    const assets = [
        { name: 'Bitcoin', symbol: 'BTC', price: 64230.50, change: 2.4, amount: 0.45, value: 28903.72, icon: Bitcoin, color: 'text-orange-500' },
        { name: 'Ethereum', symbol: 'ETH', price: 3450.20, change: -1.2, amount: 4.2, value: 14490.84, icon: Activity, color: 'text-blue-500' },
        { name: 'Tesla', symbol: 'TSLA', price: 245.60, change: 5.8, amount: 50, value: 12280.00, icon: Activity, color: 'text-red-500' },
        { name: 'Apple', symbol: 'AAPL', price: 178.35, change: 0.5, amount: 100, value: 17835.00, icon: Activity, color: 'text-gray-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white">Investments</h2>
                    <p className="text-gray-400 mt-1">Crypto & Stock Portfolio</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                    <h3 className="text-4xl font-bold text-white">$73,509.56</h3>
                    <p className="text-secondary text-sm font-medium flex items-center justify-end mt-1">
                        <TrendingUp size={16} className="mr-1" /> +$1,240.50 (2.4%)
                    </p>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-surface rounded-2xl border border-white/5 p-6 h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                {/* Simple SVG Line Chart */}
                <svg className="w-full h-full text-primary" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 10 18, 20 12 T 40 14 T 60 8 T 80 12 T 100 5" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 15 Q 10 18, 20 12 T 40 14 T 60 8 T 80 12 T 100 5 V 20 H 0 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
                </svg>
                <div className="absolute top-4 left-6 flex gap-4">
                    {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((t, i) => (
                        <button key={t} className={cn("text-xs font-medium px-2 py-1 rounded", i === 3 ? "bg-white/10 text-white" : "text-gray-500 hover:text-white")}>{t}</button>
                    ))}
                </div>
            </div>

            {/* Assets List */}
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">Your Assets</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {assets.map((asset) => (
                        <div key={asset.symbol} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-10 h-10 rounded-full bg-white/5 flex items-center justify-center", asset.color)}>
                                    <asset.icon size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white">{asset.name}</p>
                                    <p className="text-sm text-gray-500">{asset.amount} {asset.symbol}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-white">${asset.value.toLocaleString()}</p>
                                <div className={cn("text-xs font-medium flex items-center justify-end", asset.change >= 0 ? "text-secondary" : "text-red-400")}>
                                    {asset.change >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                    {Math.abs(asset.change)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Investments;
