import { ArrowRight, Shield, Zap, TrendingUp, CreditCard, Lock, Globe, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
    {
        icon: Zap,
        title: 'Instant Transfers',
        desc: 'Send money to anyone in seconds. No delays, no hidden fees.',
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
    },
    {
        icon: Shield,
        title: 'Bank-Grade Security',
        desc: 'Your money is protected with 256-bit encryption and biometric auth.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
    },
    {
        icon: TrendingUp,
        title: 'Smart Investments',
        desc: 'Grow your wealth with crypto and stocks — all in one place.',
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
    },
    {
        icon: CreditCard,
        title: 'Virtual Cards',
        desc: 'Instantly create virtual cards for secure online shopping.',
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
    },
    {
        icon: Lock,
        title: 'Zero-Fee Bills',
        desc: 'Pay all your bills from one dashboard. On time, every time.',
        color: 'text-pink-400',
        bg: 'bg-pink-400/10',
    },
    {
        icon: Globe,
        title: 'Global Access',
        desc: 'Access your money anywhere in the world. 24/7 support included.',
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
    },
];

const stats = [
    { value: '2M+', label: 'Active Users' },
    { value: '$4B+', label: 'Processed Monthly' },
    { value: '99.9%', label: 'Uptime' },
    { value: '190+', label: 'Countries' },
];

const testimonials = [
    { name: 'Jordan Lee', role: 'Freelance Designer', quote: "Noble Trust Bank replaced three apps for me. I run my entire financial life from one dashboard.", avatar: 'JL', color: 'bg-pink-500' },
    { name: 'Marcus Chen', role: 'Software Engineer', quote: "The instant transfers and virtual cards are a game changer. I won't go back.", avatar: 'MC', color: 'bg-blue-500' },
    { name: 'Aisha Okafor', role: 'Product Manager', quote: "Finally a fintech app that doesn't look like it was designed in 2015.", avatar: 'AO', color: 'bg-purple-500' },
];

const Landing = () => {
    return (
        <div className="min-h-screen bg-background text-white overflow-x-hidden">
            {/* ── Nav ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                            <span className="text-white font-black text-sm">N</span>
                        </div>
                        <span className="text-lg font-black text-white tracking-tight">NOBLE TRUST</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'Security', 'Pricing'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/signin" className="text-gray-300 hover:text-white text-sm font-medium transition-colors hidden sm:block">
                            Sign In
                        </Link>
                        <Link to="/signup" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-1.5">
                            Get Started <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-60 left-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            The Modern Banking Experience
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                            Your money.
                            <br />
                            <span className="text-primary">Your control.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Noble Trust Bank gives young professionals a smarter way to bank — instant transfers, virtual cards, investments, and bill pay. All in one beautiful dashboard.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup"
                                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 group">
                                Open Free Account
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/signin"
                                className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-base font-bold transition-all border border-white/10 flex items-center justify-center gap-2">
                                Sign In
                            </Link>
                        </div>

                        <p className="text-gray-600 text-sm mt-5">Free forever · No credit card required · Set up in 2 minutes</p>
                    </div>

                    {/* Dashboard Preview Card */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" style={{ top: '60%' }} />
                        <div className="bg-surface border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/40">
                            {/* Mock dashboard header */}
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Balance</p>
                                    <p className="text-4xl font-bold text-white mt-1">$24,562.00</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                </div>
                            </div>
                            {/* Mock stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { label: 'Income', value: '+$4,500', color: 'text-emerald-400' },
                                    { label: 'Expenses', value: '-$1,291', color: 'text-red-400' },
                                    { label: 'Savings', value: '$8,201', color: 'text-blue-400' },
                                ].map(s => (
                                    <div key={s.label} className="bg-background/50 rounded-xl p-4">
                                        <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                                        <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Mock transactions */}
                            <div className="space-y-3">
                                {[
                                    { name: 'Salary Deposit', cat: 'Income', amount: '+$4,500.00', color: 'text-emerald-400', icon: '💼' },
                                    { name: 'Starbucks', cat: 'Food & Drink', amount: '-$5.50', color: 'text-white', icon: '☕' },
                                    { name: 'Apple Store', cat: 'Technology', amount: '-$999.00', color: 'text-white', icon: '📱' },
                                ].map(t => (
                                    <div key={t.name} className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-base">{t.icon}</div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{t.name}</p>
                                                <p className="text-xs text-gray-500">{t.cat}</p>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-bold ${t.color}`}>{t.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-16 px-6 border-y border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(s => (
                        <div key={s.label} className="text-center">
                            <p className="text-4xl font-black text-white mb-1">{s.value}</p>
                            <p className="text-gray-500 text-sm">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Everything you need.</h2>
                        <p className="text-gray-400 text-lg">One app replaces your entire financial stack.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map(f => (
                            <div key={f.title} className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group hover:-translate-y-1 duration-200">
                                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-5`}>
                                    <f.icon size={22} className={f.color} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Virtual Card Showcase ── */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Virtual cards for the digital age.
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Generate instant virtual cards for every purchase. Keep your real card details safe while shopping online.
                            </p>
                            <ul className="space-y-3 mb-10">
                                {['Instant card generation', 'Freeze or unfreeze in one tap', 'Real-time spending alerts', 'Full card details on demand'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Check size={11} className="text-primary" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/signup" className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 group">
                                Get your card <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Card visual */}
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
                            <div className="relative w-full max-w-sm">
                                {/* Back card */}
                                <div className="absolute -right-4 -top-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl w-full aspect-[1.586/1] opacity-50 rotate-6" />
                                {/* Front card */}
                                <div className="relative bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl w-full aspect-[1.586/1] flex flex-col justify-between overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <p className="text-white/70 text-xs mb-1">NOBLE TRUST CARD</p>
                                            <p className="text-white font-bold">Virtual</p>
                                        </div>
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-white/90 text-lg font-mono tracking-widest mb-4">4532 •••• •••• 8901</p>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-white/50 text-[10px] mb-0.5">CARDHOLDER</p>
                                                <p className="text-white text-sm font-medium">YOUR NAME</p>
                                            </div>
                                            <div>
                                                <p className="text-white/50 text-[10px] mb-0.5">EXPIRES</p>
                                                <p className="text-white text-sm font-medium">12/28</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Loved by professionals.</h2>
                        <p className="text-gray-400 text-lg">Join thousands who've made the switch.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map(t => (
                            <div key={t.name} className="bg-surface border border-white/5 rounded-2xl p-6">
                                <p className="text-gray-300 leading-relaxed mb-6">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>{t.avatar}</div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{t.name}</p>
                                        <p className="text-gray-500 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-primary/20 via-surface to-purple-600/10 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Start banking smarter.</h2>
                            <p className="text-gray-400 text-lg mb-8">Open your free account today. Takes less than 2 minutes.</p>
                            <Link to="/signup"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-primary/30 group">
                                Create Free Account
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-white/5 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <span className="text-white font-black text-xs">N</span>
                        </div>
                        <span className="text-white font-bold">NOBLE TRUST</span>
                    </div>
                    <p className="text-gray-600 text-sm">© 2026 Noble Trust Bank. Built for modern professionals.</p>
                    <div className="flex gap-6">
                        {['Privacy', 'Terms', 'Security'].map(item => (
                            <a key={item} href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
