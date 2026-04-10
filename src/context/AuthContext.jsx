import { createContext, useContext, useState } from 'react';
import { authAPI } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('vault_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authAPI.login(email, password);
            const { token, user: userData } = response;
            
            const initials = userData.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
            
            const userWithInitials = { ...userData, initials };
            setUser(userWithInitials);
            localStorage.setItem('vault_user', JSON.stringify(userWithInitials));
            localStorage.setItem('vault_token', token);
            
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, name) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authAPI.signup(email, password, name);
            const { token, user: userData } = response;
            
            const initials = userData.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
            
            const userWithInitials = { ...userData, initials };
            setUser(userWithInitials);
            localStorage.setItem('vault_user', JSON.stringify(userWithInitials));
            localStorage.setItem('vault_token', token);
            
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
        localStorage.removeItem('vault_user');
        localStorage.removeItem('vault_token');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            signup,
            logout, 
            isAuthenticated: !!user,
            loading,
            error,
            setError
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
