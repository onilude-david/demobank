import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import MyBank from './pages/MyBank';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Loans from './pages/Loans';
import Investments from './pages/Investments';
import BillPay from './pages/BillPay';
import Transfer from './pages/Transfer';
import AddMoney from './pages/AddMoney';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Dashboard Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/cards" element={<MyBank />} />
            <Route path="/my-bank" element={<MyBank />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/bills" element={<BillPay />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/add-money" element={<AddMoney />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Overview />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
