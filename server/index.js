// Basic Express server setup for demobank backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route imports
app.use('/api/auth', require('./routes/auth'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/add-money', require('./routes/addMoney'));
app.use('/api/investments', require('./routes/investments'));
app.use('/api/loans', require('./routes/loans'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/link-bank', require('./routes/linkBank'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
