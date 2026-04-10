const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('vault_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  signup: (email, password, name) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getCurrentUser: () =>
    apiCall('/auth/me', { method: 'GET' }),
};

// Accounts APIs
export const accountsAPI = {
  getAccounts: () =>
    apiCall('/accounts', { method: 'GET' }),
};

// Transactions APIs
export const transactionsAPI = {
  getTransactions: () =>
    apiCall('/transactions', { method: 'GET' }),

  createTransaction: (data) =>
    apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Transfer APIs
export const transferAPI = {
  transfer: (recipient, amount) =>
    apiCall('/transfer', {
      method: 'POST',
      body: JSON.stringify({ recipient, amount }),
    }),
};

// Add Money APIs
export const addMoneyAPI = {
  addFunds: (amount) =>
    apiCall('/add-money', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),
};

// Investments APIs
export const investmentsAPI = {
  getInvestments: () =>
    apiCall('/investments', { method: 'GET' }),
};

// Loans APIs
export const loansAPI = {
  getLoans: () =>
    apiCall('/loans', { method: 'GET' }),
};

// Bills APIs
export const billsAPI = {
  getBills: () =>
    apiCall('/bills', { method: 'GET' }),
};

// Link Bank APIs
export const linkBankAPI = {
  linkBankAccount: (accountData) =>
    apiCall('/link-bank', {
      method: 'POST',
      body: JSON.stringify(accountData),
    }),
};

// Settings APIs
export const settingsAPI = {
  getSettings: () =>
    apiCall('/settings', { method: 'GET' }),

  updateSettings: (settings) =>
    apiCall('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};
