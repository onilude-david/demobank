import React, { createContext, useContext, useState, useEffect } from 'react';
import { accountsAPI, transactionsAPI, transferAPI, addMoneyAPI } from '../lib/api';

const AppContext = createContext();

const INITIAL_TRANSACTIONS = [];

export const AppProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch accounts and transactions on mount or auth change
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('vault_token');
                if (!token) return;

                const accountsData = await accountsAPI.getAccounts();
                if (accountsData.balance !== undefined) {
                    setBalance(accountsData.balance);
                }

                const transactionsData = await transactionsAPI.getTransactions();
                if (Array.isArray(transactionsData.transactions)) {
                    setTransactions(transactionsData.transactions);
                }
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addMoney = async (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) return false;

        try {
            const response = await addMoneyAPI.addFunds(num);
            if (response.success) {
                setBalance(prev => prev + num);
                setTransactions(prev => [{
                    id: Date.now(),
                    merchant: 'Deposit',
                    date: 'Just now',
                    amount: num,
                    type: 'income',
                    category: 'Deposit',
                }, ...prev]);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const sendMoney = async (recipient, amount) => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) return false;
        if (num > balance) return false;

        try {
            const response = await transferAPI.transfer(recipient, num);
            if (response.success) {
                setBalance(prev => prev - num);
                setTransactions(prev => [{
                    id: Date.now(),
                    merchant: `Transfer to ${recipient}`,
                    date: 'Just now',
                    amount: -num,
                    type: 'expense',
                    category: 'Transfer',
                }, ...prev]);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const payBill = async (billName, amount) => {
        const num = parseFloat(amount);
        if (num <= 0) return false;

        try {
            const response = await transactionsAPI.createTransaction({
                merchant: billName,
                amount: -num,
                type: 'expense',
                category: 'Bills',
            });
            if (response.success) {
                setBalance(prev => prev - num);
                setTransactions(prev => [{
                    id: Date.now(),
                    merchant: billName,
                    date: 'Just now',
                    amount: -num,
                    type: 'expense',
                    category: 'Bills',
                }, ...prev]);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    return (
        <AppContext.Provider value={{ 
            balance, 
            transactions, 
            addMoney, 
            sendMoney, 
            payBill,
            loading,
            error,
            setTransactions,
            setBalance
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
