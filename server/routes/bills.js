const express = require('express');
const router = express.Router();

// GET /api/bills
router.get('/', (req, res) => {
  // Placeholder: Return bills
  res.json({ message: 'Bills endpoint (not implemented)' });
});

module.exports = router;
