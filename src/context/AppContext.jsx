import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const INITIAL_TRANSACTIONS = [
    { id: 1, merchant: 'Starbucks', date: 'Today, 10:23 AM', amount: -5.50, type: 'expense', category: 'Food' },
    { id: 2, merchant: 'Apple Store', date: 'Yesterday, 4:15 PM', amount: -999.00, type: 'expense', category: 'Tech' },
    { id: 3, merchant: 'Salary Deposit', date: 'Oct 28, 9:00 AM', amount: 4500.00, type: 'income', category: 'Salary' },
    { id: 4, merchant: 'Uber', date: 'Oct 27, 8:30 PM', amount: -24.50, type: 'expense', category: 'Transport' },
    { id: 5, merchant: 'Whole Foods', date: 'Oct 26, 6:45 PM', amount: -142.80, type: 'expense', category: 'Groceries' },
    { id: 6, merchant: 'Electric Bill', date: 'Oct 25, 11:00 AM', amount: -120.00, type: 'expense', category: 'Utilities' },
];

export const AppProvider = ({ children }) => {
    const [balance, setBalance] = useState(24562.00);
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

    const addMoney = (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) return;
        setBalance(prev => prev + num);
        setTransactions(prev => [{
            id: Date.now(),
            merchant: 'Deposit',
            date: 'Just now',
            amount: num,
            type: 'income',
            category: 'Deposit',
        }, ...prev]);
    };

    const sendMoney = (recipient, amount) => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) return false;
        if (num > balance) return false;
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
    };

    const payBill = (billName, amount) => {
        const num = parseFloat(amount);
        setBalance(prev => prev - num);
        setTransactions(prev => [{
            id: Date.now(),
            merchant: billName,
            date: 'Just now',
            amount: -num,
            type: 'expense',
            category: 'Bills',
        }, ...prev]);
    };

    return (
        <AppContext.Provider value={{ balance, transactions, addMoney, sendMoney, payBill }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
