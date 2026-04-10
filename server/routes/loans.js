const express = require('express');
const router = express.Router();

// GET /api/loans
router.get('/', (req, res) => {
  // Placeholder: Return loans
  res.json({ message: 'Loans endpoint (not implemented)' });
});

module.exports = router;
