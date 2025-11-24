import React, { useState } from 'react';
import { User, Bell, Shield, Moon, Globe, LogOut, ChevronRight, Smartphone, Mail, Lock, Key, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'security', icon: Shield, label: 'Security' },
        { id: 'language', icon: Globe, label: 'Language' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-main">Settings</h2>
                <p className="text-muted mt-1">Manage your account preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-muted hover:bg-surface hover:text-main'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="font-medium">{tab.label}</span>
                            <ChevronRight size={16} className="ml-auto opacity-50" />
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            <section className="bg-surface rounded-2xl border border-white/5 p-6">
                                <h3 className="text-xl font-bold text-main mb-6">Profile Information</h3>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/20">
                                        AS
                                    </div>
                                    <div>
                                        <button className="bg-white/5 hover:bg-white/10 text-main px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                            Change Avatar
                                        </button>
                                        <p className="text-xs text-muted mt-2">JPG, GIF or PNG. Max size 800K</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted">First Name</label>
                                        <input type="text" defaultValue="Alexander" className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted">Last Name</label>
                                        <input type="text" defaultValue="Smith" className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-muted">Email Address</label>
                                        <input type="email" defaultValue="alex.smith@example.com" className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors" />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-surface rounded-2xl border border-white/5 p-6">
                                <h3 className="text-xl font-bold text-main mb-6">Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                                                <Moon size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-main">Dark Mode</p>
                                                <p className="text-xs text-muted">Use dark theme across the app</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleTheme}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-primary' : 'bg-gray-400'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <section className="bg-surface rounded-2xl border border-white/5 p-6">
                            <h3 className="text-xl font-bold text-main mb-6">Notification Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">Push Notifications</p>
                                            <p className="text-xs text-muted">Receive alerts on your device</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-primary rounded-full p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6 shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">Email Notifications</p>
                                            <p className="text-xs text-muted">Get updates via email</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full left-1 shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">SMS Alerts</p>
                                            <p className="text-xs text-muted">Transaction alerts via SMS</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-primary rounded-full p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6 shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <section className="bg-surface rounded-2xl border border-white/5 p-6">
                            <h3 className="text-xl font-bold text-main mb-6">Security Settings</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
                                            <Lock size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">Change Password</p>
                                            <p className="text-xs text-muted">Update your account password</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-white/5 hover:bg-white/10 text-main py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                        Update Password
                                    </button>
                                </div>

                                <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                                            <Key size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">Two-Factor Authentication</p>
                                            <p className="text-xs text-muted">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                        Enable 2FA
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-main">Biometric Login</p>
                                            <p className="text-xs text-muted">Use fingerprint or face ID</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full left-1 shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Language Tab */}
                    {activeTab === 'language' && (
                        <section className="bg-surface rounded-2xl border border-white/5 p-6">
                            <h3 className="text-xl font-bold text-main mb-6">Language & Region</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Display Language</label>
                                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors">
                                        <option>English (US)</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                        <option>Japanese</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Currency</label>
                                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>JPY (¥)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Time Zone</label>
                                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-main focus:outline-none focus:border-primary/50 transition-colors">
                                        <option>UTC-05:00 (Eastern Time)</option>
                                        <option>UTC-08:00 (Pacific Time)</option>
                                        <option>UTC+00:00 (GMT)</option>
                                        <option>UTC+01:00 (Central European Time)</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Sign Out Button */}
                    <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium flex items-center justify-center gap-2">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
