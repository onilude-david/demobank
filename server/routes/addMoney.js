const express = require('express');
const router = express.Router();

// POST /api/add-money
router.post('/', (req, res) => {
  const { amount } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  
  res.json({ 
    success: true,
    deposit: {
      id: Date.now(),
      amount,
      date: new Date().toISOString(),
      status: 'completed',
      newBalance: 24562.00 + amount
    }
  });
});

module.exports = router;
