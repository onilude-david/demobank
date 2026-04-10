const express = require('express');
const router = express.Router();

// POST /api/add-money
router.post('/', (req, res) => {
  // Placeholder: Add funds
  res.json({ message: 'Add money endpoint (not implemented)' });
});

module.exports = router;
