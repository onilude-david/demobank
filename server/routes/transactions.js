const express = require('express');
const router = express.Router();

// Mock transactions data
const mockTransactions = [
  { id: 1, merchant: 'Starbucks', date: 'Today, 10:23 AM', amount: -5.50, type: 'expense', category: 'Food' },
  { id: 2, merchant: 'Apple Store', date: 'Yesterday, 4:15 PM', amount: -999.00, type: 'expense', category: 'Tech' },
  { id: 3, merchant: 'Salary Deposit', date: 'Oct 28, 9:00 AM', amount: 4500.00, type: 'income', category: 'Salary' },
  { id: 4, merchant: 'Uber', date: 'Oct 27, 8:30 PM', amount: -24.50, type: 'expense', category: 'Transport' },
  { id: 5, merchant: 'Whole Foods', date: 'Oct 26, 6:45 PM', amount: -142.80, type: 'expense', category: 'Groceries' },
  { id: 6, merchant: 'Electric Bill', date: 'Oct 25, 11:00 AM', amount: -120.00, type: 'expense', category: 'Utilities' },
];

// GET /api/transactions
router.get('/', (req, res) => {
  // Placeholder: Return transactions
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  res.json({ 
    success: true,
    transactions: mockTransactions
  });
});

// POST /api/transactions
router.post('/', (req, res) => {
  // Placeholder: Create transaction
  const { merchant, amount, type, category } = req.body;
  
  if (!merchant || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const newTransaction = {
    id: Date.now(),
    merchant,
    date: 'Just now',
    amount,
    type: type || 'expense',
    category: category || 'Other'
  };
  
  res.json({ 
    success: true,
    transaction: newTransaction
  });
});

module.exports = router;
