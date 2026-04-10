const express = require('express');
const router = express.Router();

// POST /api/transfer
router.post('/', (req, res) => {
  const { recipient, amount } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  if (!recipient || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Missing required fields or invalid amount' });
  }
  
  res.json({ 
    success: true,
    transfer: {
      id: Date.now(),
      recipient,
      amount,
      date: new Date().toISOString(),
      status: 'completed'
    }
  });
});

module.exports = router;
