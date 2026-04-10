import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const fetchData = useCallback(async (userId) => {
        setLoadingData(true);
        try {
            const [{ data: account }, { data: txns }] = await Promise.all([
                supabase
                    .from('accounts')
                    .select('balance')
                    .eq('user_id', userId)
                    .single(),
                supabase
                    .from('transactions')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false }),
            ]);

            if (account) setBalance(parseFloat(account.balance));
            if (txns) setTransactions(txns);
        } finally {
            setLoadingData(false);
        }
    }, []);

    useEffect(() => {
        // Fetch on mount if session already exists
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) fetchData(session.user.id);
            else setLoadingData(false);
        });

        // Re-fetch whenever auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchData(session.user.id);
            } else {
                setBalance(0);
                setTransactions([]);
                setLoadingData(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [fetchData]);

    const addMoney = async (amount) => {
        const num = parseFloat(amount);
        if (Number.isNaN(num) || num <= 0) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const newBalance = balance + num;
        await Promise.all([
            supabase.from('accounts').update({ balance: newBalance }).eq('user_id', user.id),
            supabase.from('transactions').insert({
                user_id: user.id,
                merchant: 'Deposit',
                amount: num,
                type: 'income',
                category: 'Deposit',
                date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            }),
        ]);
        await fetchData(user.id);
    };

    const sendMoney = async (recipient, amount) => {
        const num = parseFloat(amount);
        if (Number.isNaN(num) || num <= 0 || num > balance) return false;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const newBalance = balance - num;
        await Promise.all([
            supabase.from('accounts').update({ balance: newBalance }).eq('user_id', user.id),
            supabase.from('transactions').insert({
                user_id: user.id,
                merchant: `Transfer to ${recipient}`,
                amount: -num,
                type: 'expense',
                category: 'Transfer',
                date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            }),
        ]);
        await fetchData(user.id);
        return true;
    };

    const payBill = async (billName, amount) => {
        const num = parseFloat(amount);
        if (Number.isNaN(num) || num <= 0) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const newBalance = balance - num;
        await Promise.all([
            supabase.from('accounts').update({ balance: newBalance }).eq('user_id', user.id),
            supabase.from('transactions').insert({
                user_id: user.id,
                merchant: billName,
                amount: -num,
                type: 'expense',
                category: 'Bills',
                date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            }),
        ]);
        await fetchData(user.id);
    };

    return (
        <AppContext.Provider value={{ balance, transactions, addMoney, sendMoney, payBill, loadingData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
};
