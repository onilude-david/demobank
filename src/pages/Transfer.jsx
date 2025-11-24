import React, { useState } from 'react';
import { Search, User, ArrowRight, Clock } from 'lucide-react';

const Transfer = () => {
    const [amount, setAmount] = useState('');

    const contacts = [
        { id: 1, name: 'Sarah Wilson', initial: 'SW', color: 'bg-pink-500' },
        { id: 2, name: 'David Chen', initial: 'DC', color: 'bg-blue-500' },
        { id: 3, name: 'Mike Ross', initial: 'MR', color: 'bg-green-500' },
        { id: 4, name: 'Emma Watson', initial: 'EW', color: 'bg-purple-500' },
        { id: 5, name: 'James Bond', initial: 'JB', color: 'bg-yellow-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Transfer Money</h2>
                <p className="text-gray-400 mt-1">Send funds to friends and family instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Send Money Form */}
                <div className="bg-surface rounded-2xl border border-white/5 p-8">
                    <div className="mb-8">
                        <label className="text-sm font-medium text-gray-400 mb-2 block">Select Recipient</label>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            <button className="flex flex-col items-center gap-2 min-w-[80px]">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-primary hover:text-primary transition-colors">
                                    <Search size={24} />
                                </div>
                                <span className="text-xs text-gray-400">Find</span>
                            </button>
                            {contacts.map((contact) => (
                                <button key={contact.id} className="flex flex-col items-center gap-2 min-w-[80px] group">
                                    <div className={`w-14 h-14 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-lg border-2 border-transparent group-hover:border-white transition-all`}>
                                        {contact.initial}
                                    </div>
                                    <span className="text-xs text-gray-400 group-hover:text-white">{contact.name.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="text-sm font-medium text-gray-400 mb-2 block">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-background border border-white/10 rounded-2xl pl-10 pr-4 py-6 text-4xl font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        Send Money
                        <ArrowRight size={20} />
                    </button>
                </div>

                {/* Recent Transfers */}
                <div className="bg-surface rounded-2xl border border-white/5 p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Transfers</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-background transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Sarah Wilson</p>
                                        <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                                    </div>
                                </div>
                                <span className="font-bold text-white">-$50.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
