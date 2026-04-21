import React from 'react';
import { Zap, Wifi, Smartphone, Droplet, Bitcoin, CreditCard, ChevronRight } from 'lucide-react';

const BillPay = () => {
    const bills = [
        { id: 1, name: 'Electric Company', due: 'Oct 15', amount: 124.50, icon: Zap, color: 'text-yellow-400' },
        { id: 2, name: 'Internet Provider', due: 'Oct 18', amount: 89.99, icon: Wifi, color: 'text-blue-400' },
        { id: 3, name: 'Mobile Plan', due: 'Oct 20', amount: 65.00, icon: Smartphone, color: 'text-green-400' },
        { id: 4, name: 'Water Utility', due: 'Oct 25', amount: 45.20, icon: Droplet, color: 'text-cyan-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Bill Pay</h2>
                <p className="text-gray-400 mt-1">Pay your bills with Cash or Crypto.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Bills List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white">Due Soon</h3>
                    <div className="space-y-4">
                        {bills.map((bill) => (
                            <div key={bill.id} className="bg-surface p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${bill.color}`}>
                                        <bill.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{bill.name}</p>
                                        <p className="text-sm text-gray-500">Due {bill.due}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-white text-lg">${bill.amount}</span>
                                    <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                        Pay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className="bg-surface rounded-2xl border border-white/5 p-6 h-fit">
                    <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>

                    <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-primary bg-primary/5 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500/10 text-orange-500 p-2 rounded-lg">
                                    <Bitcoin size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Crypto Wallet</p>
                                    <p className="text-xs text-gray-400">BTC, ETH, USDT</p>
                                </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border-4 border-primary bg-white" />
                        </div>

                        <div className="p-4 rounded-xl border border-white/5 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Noble Trust Bank Card</p>
                                    <p className="text-xs text-gray-400">Ending in 4289</p>
                                </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border border-gray-600" />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Total Due</span>
                            <span className="text-white font-bold">$324.69</span>
                        </div>
                        <div className="flex justify-between mb-6">
                            <span className="text-gray-400">Crypto Est.</span>
                            <span className="text-secondary font-bold">0.0051 BTC</span>
                        </div>

                        <button className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                            Pay All with Crypto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillPay;
