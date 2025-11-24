import React from 'react';
import { Plus, Lock, Eye, Settings, Shield, Smartphone } from 'lucide-react';

const Cards = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">My Cards</h2>
                    <p className="text-gray-400 mt-1">Manage your physical and virtual cards.</p>
                </div>
                <button className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-2">
                    <Plus size={20} />
                    Add New Card
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card Visual Section */}
                <div className="space-y-6">
                    {/* The Card */}
                    <div className="relative w-full aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 group">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-secondary opacity-90" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        {/* Glass Effect Overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

                        {/* Content */}
                        <div className="relative h-full p-8 flex flex-col justify-between text-white">
                            <div className="flex justify-between items-start">
                                <div className="text-2xl font-bold tracking-wider">VAULT</div>
                                <div className="text-lg font-medium opacity-80">Debit</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-md border border-white/30" />
                                    <div className="text-2xl tracking-[0.2em] font-mono drop-shadow-md">
                                        •••• •••• •••• 4289
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Card Holder</div>
                                        <div className="font-medium tracking-wide">ALEXANDER SMITH</div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-70 uppercase tracking-wider mb-1">Expires</div>
                                        <div className="font-medium tracking-wide">09/28</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Actions */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { icon: Lock, label: 'Freeze' },
                            { icon: Eye, label: 'Show PIN' },
                            { icon: Settings, label: 'Settings' },
                            { icon: Shield, label: 'Limits' },
                        ].map((action, i) => (
                            <button key={i} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-surface hover:bg-surface-hover border border-white/5 hover:border-primary/30 transition-all group">
                                <div className="p-3 rounded-full bg-background group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                    <action.icon size={20} />
                                </div>
                                <span className="text-xs font-medium text-gray-400 group-hover:text-white">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Card Settings / Details */}
                <div className="bg-surface rounded-2xl border border-white/5 p-6 space-y-6">
                    <h3 className="text-xl font-bold text-white">Card Settings</h3>

                    <div className="space-y-4">
                        {[
                            { title: 'Online Payments', desc: 'Enable transactions on the internet', active: true },
                            { title: 'ATM Withdrawals', desc: 'Enable cash withdrawals at ATMs', active: true },
                            { title: 'International Use', desc: 'Enable payments abroad', active: false },
                            { title: 'Contactless', desc: 'Tap to pay with your card', active: true },
                        ].map((setting, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-transparent hover:border-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Smartphone size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{setting.title}</p>
                                        <p className="text-xs text-gray-500">{setting.desc}</p>
                                    </div>
                                </div>
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${setting.active ? 'bg-primary' : 'bg-gray-700'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${setting.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
