import { useState } from 'react';
import { CreditCard, Building2, Plus, Lock, MoreVertical, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MyBank = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('cards');
    const [showAddBank, setShowAddBank] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [bankStep, setBankStep] = useState(1);

    const banks = [
        { name: 'Chase', color: 'bg-blue-900', linked: true },
        { name: 'Bank of America', color: 'bg-red-700', linked: false },
        { name: 'Wells Fargo', color: 'bg-yellow-600', linked: false },
        { name: 'Citi', color: 'bg-blue-600', linked: false },
    ];

    const linkedBanks = banks.filter(b => b.linked);

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
        setBankStep(2);
    };

    const handleConnect = (e) => {
        e.preventDefault();
        setBankStep(3);
        setTimeout(() => {
            setShowAddBank(false);
            setBankStep(1);
            setSelectedBank(null);
        }, 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white">My Bank</h2>
                <p className="text-gray-400 mt-1">Manage your cards and linked accounts.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('cards')}
                    className={`px-6 py-3 font-medium transition-all ${activeTab === 'cards'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <CreditCard size={18} className="inline mr-2" />
                    Cards
                </button>
                <button
                    onClick={() => setActiveTab('banks')}
                    className={`px-6 py-3 font-medium transition-all ${activeTab === 'banks'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Building2 size={18} className="inline mr-2" />
                    Linked Banks
                </button>
            </div>

            {/* Cards Tab */}
            {activeTab === 'cards' && (
                <div className="space-y-8">
                    {/* 3D Card Display */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-primary/20 max-w-md mx-auto aspect-[1.586/1] flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white/80 text-sm mb-1">VAULT CARD</p>
                                        <p className="text-white font-bold text-xl">Virtual</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="text-white/90 text-2xl font-mono tracking-wider mb-6">
                                    4532  ••••  ••••  8901
                                </p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/60 text-xs mb-1">CARDHOLDER</p>
                                        <p className="text-white font-medium">{user?.name?.toUpperCase() ?? 'VAULT USER'}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-xs mb-1">EXPIRES</p>
                                        <p className="text-white font-medium">12/26</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Lock, label: 'Freeze Card', color: 'text-yellow-400' },
                            { icon: CreditCard, label: 'Card Details', color: 'text-blue-400' },
                            { icon: Plus, label: 'New Card', color: 'text-green-400' },
                            { icon: MoreVertical, label: 'More', color: 'text-gray-400' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                className="bg-surface hover:bg-surface-hover p-6 rounded-2xl border border-white/5 transition-all group"
                            >
                                <div className="p-3 rounded-full bg-background group-hover:bg-primary/20 group-hover:text-primary transition-colors mb-3 inline-flex">
                                    <action.icon size={24} className={action.color} />
                                </div>
                                <p className="text-sm font-medium text-white">{action.label}</p>
                            </button>
                        ))}
                    </div>

                    {/* Card Settings */}
                    <div className="bg-surface rounded-2xl border border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Card Settings</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Online Transactions', enabled: true },
                                { label: 'Contactless Payments', enabled: true },
                                { label: 'International Purchases', enabled: false },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-transparent hover:border-white/5 transition-colors">
                                    <span className="text-white font-medium">{setting.label}</span>
                                    <div className={`w-12 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-primary' : 'bg-gray-600'} p-1 cursor-pointer`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${setting.enabled ? 'translate-x-6' : ''}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Linked Banks Tab */}
            {activeTab === 'banks' && !showAddBank && (
                <div className="space-y-6">
                    {/* Linked Banks List */}
                    {linkedBanks.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Connected Accounts</h3>
                            {linkedBanks.map((bank, i) => (
                                <div key={i} className="bg-surface p-6 rounded-2xl border border-white/5 flex items-center justify-between hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-full ${bank.color} flex items-center justify-center text-white font-bold text-lg`}>
                                            {bank.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{bank.name}</p>
                                            <p className="text-sm text-gray-400">••••  ••••  ••••  4532</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 text-green-400 text-sm">
                                            <Check size={16} />
                                            <span>Connected</span>
                                        </div>
                                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                            <MoreVertical size={20} className="text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Bank Button */}
                    <button
                        onClick={() => setShowAddBank(true)}
                        className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        <Plus size={24} />
                        Link New Bank Account
                    </button>

                    {/* Security Notice */}
                    <div className="bg-surface rounded-2xl border border-white/5 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-500/10 text-green-400 rounded-lg">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-2">Bank-Level Security</h4>
                                <p className="text-sm text-gray-400">
                                    Your bank credentials are encrypted with 256-bit encryption and never stored on our servers.
                                    We use industry-standard security protocols to protect your financial information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Bank Flow */}
            {activeTab === 'banks' && showAddBank && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-background/50">
                            <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
                                <ShieldCheck size={16} />
                                256-bit Encrypted & Secure Connection
                            </div>
                        </div>

                        {/* Step 1: Select Bank */}
                        {bankStep === 1 && (
                            <div className="p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Select your bank</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                    {banks.filter(b => !b.linked).map((bank) => (
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
                                <button
                                    onClick={() => setShowAddBank(false)}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Step 2: Bank Login */}
                        {bankStep === 2 && selectedBank && (
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
                                            onClick={() => setBankStep(1)}
                                            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 3: Success */}
                        {bankStep === 3 && selectedBank && (
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Successfully Connected!</h3>
                                <p className="text-gray-400">
                                    Your {selectedBank.name} account has been linked to Vault.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBank;
