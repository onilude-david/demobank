import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useId, useState } from 'react';
import { useApp } from '../context/AppContext';

const contacts = [
    { id: 1, name: 'Sarah Wilson', initials: 'SW', color: 'bg-pink-500' },
    { id: 2, name: 'David Chen', initials: 'DC', color: 'bg-blue-500' },
    { id: 3, name: 'Mike Ross', initials: 'MR', color: 'bg-emerald-500' },
    { id: 4, name: 'Emma Watson', initials: 'EW', color: 'bg-purple-500' },
    { id: 5, name: 'James Bond', initials: 'JB', color: 'bg-yellow-500' },
];

const Transfer = () => {
    const { balance, sendMoney, loadingData } = useApp();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const recipientId = useId();
    const amountId = useId();

    const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const num = parseFloat(amount) || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const name = recipient.trim();
        if (!name) { setError('Please enter or select a recipient.'); return; }
        if (num <= 0) { setError('Enter an amount greater than $0.'); return; }
        if (num > balance) { setError(`Insufficient funds. Your balance is ${fmt(balance)}.`); return; }

        setSending(true);
        const ok = await sendMoney(name, num);
        setSending(false);

        if (ok) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setAmount('');
                setRecipient('');
            }, 3000);
        } else {
            setError('Transfer failed. Please try again.');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Transfer Money</h2>
                <p className="text-gray-400 mt-1">Send funds to anyone, instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Form */}
                <div className="lg:col-span-3 bg-surface rounded-2xl border border-white/5 p-7">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} className="text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Transfer Sent!</h3>
                            <p className="text-gray-400 text-sm">{fmt(num)} sent to {recipient}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                    <AlertCircle size={16} className="shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Quick contacts */}
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-3">Quick Send</p>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {contacts.map(c => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setRecipient(c.name)}
                                            className="flex flex-col items-center gap-2 shrink-0 group"
                                        >
                                            <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-sm border-2 transition-all ${recipient === c.name ? 'border-white scale-110' : 'border-transparent'}`}>
                                                {c.initials}
                                            </div>
                                            <span className="text-xs text-gray-500 group-hover:text-white transition-colors">{c.name.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recipient */}
                            <div className="space-y-2">
                                <label htmlFor={recipientId} className="text-sm font-medium text-gray-300">Send To</label>
                                <input
                                    id={recipientId}
                                    type="text"
                                    value={recipient}
                                    onChange={e => setRecipient(e.target.value)}
                                    placeholder="Name, email, or phone"
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                <label htmlFor={amountId} className="text-sm font-medium text-gray-300">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">$</span>
                                    <input
                                        id={amountId}
                                        type="number"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        min="0.01"
                                        step="0.01"
                                        className="w-full bg-background border border-white/10 rounded-2xl pl-10 pr-4 py-5 text-3xl font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                {num > 0 && num <= balance && (
                                    <p className="text-xs text-gray-500 ml-1">Remaining after transfer: {fmt(balance - num)}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={sending || loadingData}
                                className="w-full bg-primary hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {sending ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>Send Money <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Balance + recents */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-surface rounded-2xl border border-white/5 p-6">
                        <p className="text-gray-400 text-sm mb-2">Available Balance</p>
                        {loadingData
                            ? <div className="h-9 w-36 bg-white/5 animate-pulse rounded-lg" />
                            : <p className="text-3xl font-bold text-white">{fmt(balance)}</p>
                        }
                    </div>

                    <div className="bg-surface rounded-2xl border border-white/5 p-6">
                        <h4 className="text-sm font-bold text-white mb-4">Recent Transfers</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Sarah Wilson', color: 'bg-pink-500', initials: 'SW', amount: '$50.00' },
                                { name: 'David Chen', color: 'bg-blue-500', initials: 'DC', amount: '$120.00' },
                                { name: 'Mike Ross', color: 'bg-emerald-500', initials: 'MR', amount: '$35.00' },
                            ].map(r => (
                                <div key={r.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold`}>{r.initials}</div>
                                        <span className="text-sm text-gray-300">{r.name}</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">{r.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
