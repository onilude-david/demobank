const express = require('express');
const router = express.Router();

// POST /api/transfer
router.post('/', (req, res) => {
  // Placeholder: Transfer money
  res.json({ message: 'Transfer endpoint (not implemented)' });
});

module.exports = router;
