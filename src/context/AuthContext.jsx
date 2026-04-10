import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

const formatUser = (supabaseUser) => {
    const name = supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0];
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return { id: supabaseUser.id, email: supabaseUser.email, name, initials };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Restore session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ? formatUser(session.user) : null);
            setLoading(false);
        });

        // Keep in sync with Supabase auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ? formatUser(session.user) : null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const { error: err } = await supabase.auth.signInWithPassword({ email, password });
            if (err) throw err;
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, name) => {
        setError(null);
        setLoading(true);
        try {
            const { error: err } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { name } },
            });
            if (err) throw err;
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setError(null);
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
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
