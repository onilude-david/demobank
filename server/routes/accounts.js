const express = require('express');
const router = express.Router();

// GET /api/accounts
router.get('/', (req, res) => {
  // Placeholder: Return account balances/details
  res.json({ message: 'Accounts endpoint (not implemented)' });
});

module.exports = router;
