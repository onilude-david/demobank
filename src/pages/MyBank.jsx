import { useEffect, useState } from 'react';
import { CreditCard, Building2, Plus, Trash2, Check, ShieldCheck, ArrowRight, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const CARD_GRADIENTS = [
    'from-primary via-purple-600 to-pink-600',
    'from-emerald-500 via-teal-600 to-cyan-600',
    'from-orange-500 via-red-500 to-rose-600',
    'from-yellow-500 via-amber-500 to-orange-500',
    'from-violet-600 via-purple-600 to-indigo-600',
];

const detectCardType = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return 'visa';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^6/.test(n)) return 'discover';
    return 'visa';
};

const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
};

const CardVisual = ({ card, index, showFull = false }) => {
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
    const digits = card.card_number.replace(/\s/g, '');
    const display = showFull
        ? digits.replace(/(.{4})/g, '$1 ').trim()
        : `•••• •••• •••• ${digits.slice(-4)}`;

    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-2xl shadow-primary/20 max-w-md mx-auto aspect-[1.586/1] flex flex-col justify-between relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-white/80 text-sm mb-1">VAULT CARD</p>
                    <p className="text-white font-bold text-lg capitalize">{card.card_type}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-white/90 text-xl font-mono tracking-widest mb-6">{display}</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-white/60 text-xs mb-1">CARDHOLDER</p>
                        <p className="text-white font-medium">{card.cardholder_name.toUpperCase()}</p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs mb-1">EXPIRES</p>
                        <p className="text-white font-medium">{card.expiry}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const banks = [
    { name: 'Chase', color: 'bg-blue-900', linked: true },
    { name: 'Bank of America', color: 'bg-red-700', linked: false },
    { name: 'Wells Fargo', color: 'bg-yellow-600', linked: false },
    { name: 'Citi', color: 'bg-blue-600', linked: false },
];

const MyBank = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('cards');

    // Cards state
    const [cards, setCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [showFull, setShowFull] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cardForm, setCardForm] = useState({ cardholder_name: '', card_number: '', expiry: '', cvv: '' });
    const [formError, setFormError] = useState('');

    // Bank state
    const [showAddBank, setShowAddBank] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [bankStep, setBankStep] = useState(1);

    const linkedBanks = banks.filter(b => b.linked);

    useEffect(() => {
        if (!user) return;
        supabase
            .from('cards')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
            .then(({ data }) => {
                setCards(data ?? []);
                setLoadingCards(false);
            });
    }, [user]);

    const handleAddCard = async (e) => {
        e.preventDefault();
        setFormError('');
        const digits = cardForm.card_number.replace(/\s/g, '');
        if (digits.length < 15) { setFormError('Enter a valid card number.'); return; }
        if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) { setFormError('Enter expiry as MM/YY.'); return; }
        if (cardForm.cvv.length < 3) { setFormError('Enter a valid CVV.'); return; }

        setSaving(true);
        const card_type = detectCardType(digits);
        const { data, error } = await supabase.from('cards').insert({
            user_id: user.id,
            cardholder_name: cardForm.cardholder_name.trim() || user.name,
            card_number: digits.replace(/(.{4})/g, '$1 ').trim(),
            expiry: cardForm.expiry,
            cvv: cardForm.cvv,
            card_type,
        }).select().single();

        setSaving(false);
        if (error) { setFormError(error.message); return; }

        setCards(prev => [...prev, data]);
        setSelectedCardIndex(cards.length);
        setShowAddCard(false);
        setCardForm({ cardholder_name: '', card_number: '', expiry: '', cvv: '' });
    };

    const handleDeleteCard = async (id, idx) => {
        await supabase.from('cards').delete().eq('id', id);
        setCards(prev => prev.filter(c => c.id !== id));
        setSelectedCardIndex(Math.max(0, idx - 1));
    };

    const handleBankSelect = (bank) => { setSelectedBank(bank); setBankStep(2); };
    const handleConnect = (e) => {
        e.preventDefault();
        setBankStep(3);
        setTimeout(() => { setShowAddBank(false); setBankStep(1); setSelectedBank(null); }, 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">My Bank</h2>
                <p className="text-gray-400 mt-1">Manage your cards and linked accounts.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10">
                {[{ id: 'cards', icon: CreditCard, label: 'Cards' }, { id: 'banks', icon: Building2, label: 'Linked Banks' }].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`px-6 py-3 font-medium transition-all ${activeTab === t.id ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}>
                        <t.icon size={18} className="inline mr-2" />{t.label}
                    </button>
                ))}
            </div>

            {/* ── Cards Tab ── */}
            {activeTab === 'cards' && (
                <div className="space-y-8">
                    {loadingCards ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="text-center py-20 space-y-4">
                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto">
                                <CreditCard size={36} className="text-gray-500" />
                            </div>
                            <p className="text-gray-400">No cards added yet.</p>
                            <button onClick={() => setShowAddCard(true)}
                                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2">
                                <Plus size={20} /> Add Your First Card
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Card carousel */}
                            <CardVisual card={cards[selectedCardIndex]} index={selectedCardIndex} showFull={showFull} />

                            {/* Card selector dots */}
                            {cards.length > 1 && (
                                <div className="flex justify-center gap-2">
                                    {cards.map((_, i) => (
                                        <button key={i} onClick={() => { setSelectedCardIndex(i); setShowFull(false); }}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === selectedCardIndex ? 'bg-primary w-6' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                            )}

                            {/* Card actions */}
                            <div className="grid grid-cols-3 gap-4">
                                <button onClick={() => setShowFull(v => !v)}
                                    className="bg-surface hover:bg-surface-hover p-6 rounded-2xl border border-white/5 transition-all group flex flex-col items-start">
                                    <div className="p-3 rounded-full bg-background group-hover:bg-primary/20 transition-colors mb-3">
                                        {showFull ? <EyeOff size={24} className="text-blue-400" /> : <Eye size={24} className="text-blue-400" />}
                                    </div>
                                    <p className="text-sm font-medium text-white">{showFull ? 'Hide Details' : 'Show Details'}</p>
                                </button>

                                <button onClick={() => setShowAddCard(true)}
                                    className="bg-surface hover:bg-surface-hover p-6 rounded-2xl border border-white/5 transition-all group flex flex-col items-start">
                                    <div className="p-3 rounded-full bg-background group-hover:bg-primary/20 transition-colors mb-3">
                                        <Plus size={24} className="text-green-400" />
                                    </div>
                                    <p className="text-sm font-medium text-white">New Card</p>
                                </button>

                                <button onClick={() => handleDeleteCard(cards[selectedCardIndex].id, selectedCardIndex)}
                                    className="bg-surface hover:bg-surface-hover p-6 rounded-2xl border border-white/5 transition-all group flex flex-col items-start">
                                    <div className="p-3 rounded-full bg-background group-hover:bg-red-500/20 transition-colors mb-3">
                                        <Trash2 size={24} className="text-red-400" />
                                    </div>
                                    <p className="text-sm font-medium text-white">Remove Card</p>
                                </button>
                            </div>

                            {/* Show full card details when revealed */}
                            {showFull && (
                                <div className="bg-surface rounded-2xl border border-white/5 p-6 space-y-4">
                                    <h3 className="text-white font-bold text-lg">Card Details</h3>
                                    {[
                                        { label: 'Card Number', value: cards[selectedCardIndex].card_number },
                                        { label: 'Expiry', value: cards[selectedCardIndex].expiry },
                                        { label: 'CVV', value: cards[selectedCardIndex].cvv },
                                        { label: 'Cardholder', value: cards[selectedCardIndex].cardholder_name },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                                            <span className="text-gray-400 text-sm">{label}</span>
                                            <span className="text-white font-mono">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* ── Add Card Modal ── */}
            {showAddCard && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white">Add New Card</h3>
                            <button onClick={() => { setShowAddCard(false); setFormError(''); }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCard} className="p-6 space-y-4">
                            {formError && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                    {formError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder={user?.name ?? 'Full Name'}
                                    value={cardForm.cardholder_name}
                                    onChange={e => setCardForm(f => ({ ...f, cardholder_name: e.target.value }))}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Card Number</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardForm.card_number}
                                    onChange={e => setCardForm(f => ({ ...f, card_number: formatCardNumber(e.target.value) }))}
                                    maxLength={19}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono tracking-wider"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="MM/YY"
                                        value={cardForm.expiry}
                                        onChange={e => setCardForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                                        maxLength={5}
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">CVV</label>
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        placeholder="•••"
                                        value={cardForm.cvv}
                                        onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                                        maxLength={4}
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" disabled={saving}
                                className="w-full bg-primary hover:bg-blue-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2">
                                {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus size={20} /> Save Card</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Linked Banks Tab ── */}
            {activeTab === 'banks' && !showAddBank && (
                <div className="space-y-6">
                    {linkedBanks.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Connected Accounts</h3>
                            {linkedBanks.map((bank, i) => (
                                <div key={i} className="bg-surface p-6 rounded-2xl border border-white/5 flex items-center justify-between hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-full ${bank.color} flex items-center justify-center text-white font-bold text-lg`}>{bank.name[0]}</div>
                                        <div>
                                            <p className="font-bold text-white">{bank.name}</p>
                                            <p className="text-sm text-gray-400">••••  ••••  ••••  4532</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <Check size={16} /><span>Connected</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={() => setShowAddBank(true)}
                        className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <Plus size={24} /> Link New Bank Account
                    </button>

                    <div className="bg-surface rounded-2xl border border-white/5 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-500/10 text-green-400 rounded-lg"><ShieldCheck size={24} /></div>
                            <div>
                                <h4 className="font-bold text-white mb-2">Bank-Level Security</h4>
                                <p className="text-sm text-gray-400">Your bank credentials are encrypted with 256-bit encryption and never stored on our servers.</p>
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
                                <ShieldCheck size={16} /> 256-bit Encrypted & Secure Connection
                            </div>
                        </div>

                        {bankStep === 1 && (
                            <div className="p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Select your bank</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                    {banks.filter(b => !b.linked).map(bank => (
                                        <button key={bank.name} onClick={() => handleBankSelect(bank)}
                                            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group">
                                            <div className={`w-10 h-10 rounded-full ${bank.color} flex items-center justify-center text-white font-bold text-xs`}>{bank.name[0]}</div>
                                            <span className="text-sm font-medium text-gray-400 group-hover:text-white">{bank.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setShowAddBank(false)}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors">Cancel</button>
                            </div>
                        )}

                        {bankStep === 2 && selectedBank && (
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-full ${selectedBank.color} flex items-center justify-center text-white font-bold`}>{selectedBank.name[0]}</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{selectedBank.name}</h3>
                                        <p className="text-sm text-gray-400">Enter your online banking credentials</p>
                                    </div>
                                </div>
                                <form onSubmit={handleConnect} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Username / Email</label>
                                        <input type="text" placeholder="Enter your username" required
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Password</label>
                                        <input type="password" placeholder="Enter your password" required
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <button type="submit"
                                            className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                            Connect Securely <ArrowRight size={20} />
                                        </button>
                                        <button type="button" onClick={() => setBankStep(1)}
                                            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors">Back</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {bankStep === 3 && selectedBank && (
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Successfully Connected!</h3>
                                <p className="text-gray-400">Your {selectedBank.name} account has been linked to Vault.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBank;
