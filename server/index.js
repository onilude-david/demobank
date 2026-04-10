// Basic Express server setup for demobank backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Placeholder for more routes (auth, transactions, etc.)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
