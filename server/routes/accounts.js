const express = require('express');
const router = express.Router();

// Mock account data
const mockAccount = {
  balance: 24562.00,
  accountNumber: '****1234',
  accountType: 'Checking',
  lastUpdated: new Date().toISOString()
};

// GET /api/accounts
router.get('/', (req, res) => {
  // Placeholder: Return account balances/details
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  res.json({ 
    success: true,
    ...mockAccount
  });
});

module.exports = router;
