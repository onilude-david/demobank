const express = require('express');
const router = express.Router();

// GET /api/investments
router.get('/', (req, res) => {
  // Placeholder: Return investments
  res.json({ message: 'Investments endpoint (not implemented)' });
});

module.exports = router;
