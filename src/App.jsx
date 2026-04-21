import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import AddMoney from './pages/AddMoney';
import BillPay from './pages/BillPay';
import Investments from './pages/Investments';
import Landing from './pages/Landing';
import Loans from './pages/Loans';
import MyBank from './pages/MyBank';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';

// Authenticated users get bounced to dashboard
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AuthProvider>
                    <AppProvider>
                        <ToastProvider>
                            <Router>
                                <Routes>
                                    {/* Landing */}
                                    <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />

                                    {/* Auth */}
                                    <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                                    <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

                                    {/* Protected Dashboard */}
                                    <Route element={<ProtectedRoute />}>
                                        <Route element={<Layout />}>
                                            <Route path="/dashboard" element={<Overview />} />
                                            <Route path="/my-bank" element={<MyBank />} />
                                            <Route path="/transactions" element={<Transactions />} />
                                            <Route path="/loans" element={<Loans />} />
                                            <Route path="/investments" element={<Investments />} />
                                            <Route path="/bills" element={<BillPay />} />
                                            <Route path="/transfer" element={<Transfer />} />
                                            <Route path="/add-money" element={<AddMoney />} />
                                            <Route path="/settings" element={<Settings />} />
                                        </Route>
                                    </Route>

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Router>
                        </ToastProvider>
                    </AppProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
