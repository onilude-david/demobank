const express = require('express');
const router = express.Router();

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  
  // Placeholder: Register user (TODO: Add database logic)
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Mock token generation
  const token = 'mock_token_' + Date.now();
  res.json({ 
    success: true,
    token,
    user: { 
      id: 1, 
      email, 
      name,
      createdAt: new Date().toISOString()
    } 
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Placeholder: Login user (TODO: Add database logic)
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }
  
  // Mock token generation
  const token = 'mock_token_' + Date.now();
  res.json({ 
    success: true,
    token,
    user: { 
      id: 1, 
      email, 
      name: 'Alex Smith',
      lastLogin: new Date().toISOString()
    } 
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  // Placeholder: Get current user
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  res.json({ 
    success: true,
    user: { 
      id: 1, 
      email: 'user@example.com', 
      name: 'Alex Smith'
    } 
  });
});

module.exports = router;
