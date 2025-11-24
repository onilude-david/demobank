import React from 'react';
import { DollarSign, Percent, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Loans = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Loans</h2>
                <p className="text-gray-400 mt-1">Manage your loans and apply for new credit.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Loan Card */}
                <div className="bg-surface rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={120} />
                    </div>

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-gray-400 font-medium mb-1">Personal Loan</p>
                            <h3 className="text-4xl font-bold text-white">$12,450.00</h3>
                            <p className="text-sm text-secondary mt-2">Remaining Balance</p>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold">
                            Active
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">45% Paid</span>
                        </div>
                        <div className="h-3 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                        <div className="flex justify-between text-sm pt-2">
                            <div>
                                <p className="text-gray-400">Next Payment</p>
                                <p className="text-white font-medium">Oct 15, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400">Amount</p>
                                <p className="text-white font-medium">$450.00</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-8 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors border border-white/10">
                        Make Payment
                    </button>
                </div>

                {/* New Loan Promo */}
                <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Need extra cash?</h3>
                        <p className="text-white/80 mb-6">Get approved for up to $50,000 in minutes. No hidden fees, low interest rates.</p>

                        <ul className="space-y-3 mb-8">
                            {[
                                'Instant Approval',
                                'Rates as low as 5.99%',
                                'Flexible repayment terms'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <CheckCircle size={14} />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="relative z-10 bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg">
                        Apply Now
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Loans;
