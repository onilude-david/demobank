import React, { useState } from 'react';
import { Building, ShieldCheck, Lock, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LinkBank = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Select Bank, 2: Login, 3: Success
    const [selectedBank, setSelectedBank] = useState(null);

    const banks = [
        { name: 'Chase', color: 'bg-blue-900' },
        { name: 'Bank of America', color: 'bg-red-700' },
        { name: 'Wells Fargo', color: 'bg-yellow-600' },
        { name: 'Citi', color: 'bg-blue-600' },
        { name: 'US Bank', color: 'bg-blue-800' },
        { name: 'Capital One', color: 'bg-blue-950' },
    ];

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
        setStep(2);
    };

    const handleConnect = (e) => {
        e.preventDefault();
        setStep(3);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white">Link your bank</h2>
                <p className="text-gray-400 mt-2">Securely connect your bank account to Vault.</p>
            </div>

            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-background/50">
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
                        <ShieldCheck size={16} />
                        256-bit Encrypted & Secure Connection
                    </div>
                </div>

                {/* Step 1: Select Bank */}
                {step === 1 && (
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-white mb-6">Select your bank</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            {banks.map((bank) => (
                                <button
                                    key={bank.name}
                                    onClick={() => handleBankSelect(bank)}
                                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group"
                                >
                                    <div className={`w-10 h-10 rounded-full ${bank.color} flex items-center justify-center text-white font-bold text-xs`}>
                                        {bank.name[0]}
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">{bank.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-surface text-gray-500">Or search for your bank</span>
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Search e.g. 'Barclays'"
                            className="w-full mt-6 bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                )}

                {/* Step 2: Bank Login */}
                {step === 2 && selectedBank && (
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-12 h-12 rounded-full ${selectedBank.color} flex items-center justify-center text-white font-bold`}>
                                {selectedBank.name[0]}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{selectedBank.name}</h3>
                                <p className="text-sm text-gray-400">Enter your online banking credentials</p>
                            </div>
                        </div>

                        <form onSubmit={handleConnect} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Username / Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    Connect Securely
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
                                >
                                    Back to Banks
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <p className="text-xs text-yellow-200 text-center">
                                <Lock size={12} className="inline mr-1" />
                                This is a demo. Your actual credentials are never stored.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && selectedBank && (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Successfully Connected!</h3>
                        <p className="text-gray-400 mb-6">
                            Your {selectedBank.name} account has been linked to Vault.
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                            <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-primary rounded-full"></div>
                            Redirecting to dashboard...
                        </div>
                    </div>
                )}

                <div className="p-4 bg-background/30 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Lock size={12} />
                    Your credentials are encrypted and never stored by Vault.
                </div>
            </div>
        </div>
    );
};

export default LinkBank;
