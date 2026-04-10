import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const ToastContext = createContext();

const ICONS = { success: CheckCircle, error: XCircle, info: Info };
const COLORS = {
    success: 'bg-green-500/90',
    error: 'bg-red-500/90',
    info: 'bg-primary/90',
};

const ToastContainer = ({ toasts }) => (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(({ id, message, type }) => {
            const Icon = ICONS[type] || Info;
            return (
                <div
                    key={id}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white text-sm font-medium backdrop-blur-sm animate-in slide-in-from-right-4 fade-in duration-300 max-w-sm ${COLORS[type] || COLORS.info}`}
                >
                    <Icon size={16} className="shrink-0" />
                    <span>{message}</span>
                </div>
            );
        })}
    </div>
);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
};
