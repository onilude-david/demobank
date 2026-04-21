import React, { useState } from 'react';
import { CreditCard, Building, Smartphone, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddMoney = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('card');
    const [showCardForm, setShowCardForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);

    const handleAddFunds = (e) => {
        e.preventDefault();
        if (method === 'card' && !showCardForm) {
            setShowCardForm(true);
        } else {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-surface rounded-2xl border border-white/5 p-12">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Funds Added Successfully!</h3>
                    <p className="text-gray-400 mb-2">
                        ${amount || '0.00'} has been added to your Noble Trust Bank wallet.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 mt-4">
                        <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-primary rounded-full"></div>
                        Redirecting to dashboard...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Add Money</h2>
                <p className="text-gray-400 mt-1">Top up your Noble Trust Bank wallet.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Methods */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Select Method</h3>

                    <div
                        onClick={() => setMethod('card')}
                        className={`bg-surface p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${method === 'card' ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'card' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'
                                }`}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Debit Card</p>
                                <p className="text-sm text-gray-400">Instant • Free</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-4 ${method === 'card' ? 'border-primary bg-white' : 'border-gray-600'
                            }`} />
                    </div>

                    <div
                        onClick={() => setMethod('bank')}
                        className={`bg-surface p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${method === 'bank' ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'bank' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'
                                }`}>
                                <Building size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Bank Transfer</p>
                                <p className="text-sm text-gray-400">1-3 Days • No Limit</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-4 ${method === 'bank' ? 'border-primary bg-white' : 'border-gray-600'
                            }`} />
                    </div>

                    <div
                        onClick={() => setMethod('apple')}
                        className={`bg-surface p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${method === 'apple' ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'apple' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'
                                }`}>
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Apple Pay</p>
                                <p className="text-sm text-gray-400">Instant • Max $2k</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-4 ${method === 'apple' ? 'border-primary bg-white' : 'border-gray-600'
                            }`} />
                    </div>
                </div>

                {/* Amount & Card Form */}
                <div className="bg-surface rounded-2xl border border-white/5 p-8">
                    {!showCardForm ? (
                        <form onSubmit={handleAddFunds} className="flex flex-col justify-center h-full">
                            <label className="text-sm font-medium text-gray-400 mb-4 text-center">Enter Amount</label>
                            <div className="relative mb-8">
                                <span className="absolute left-1/2 -translate-x-[180%] sm:-translate-x-[200%] top-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-bold text-gray-500">$</span>
                                <input
                                    type="number"
                                    placeholder="100.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-transparent text-center text-4xl sm:text-6xl font-bold text-white placeholder:text-gray-700 focus:outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <Plus size={24} />
                                {method === 'card' ? 'Continue' : 'Add Funds'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleAddFunds} className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-6">Card Details</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        maxLength="3"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="ALEX SMITH"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                                >
                                    Add ${amount || '0.00'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCardForm(false)}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddMoney;
