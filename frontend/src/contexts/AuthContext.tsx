import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    usertype: string | null;
    authenticate: (url: string, userDto: { username: string; password: string }, redirectPath: string) => Promise<void>;
    logout: () => void;
    getAccessToken: () => string | null;
    error: string | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [usertype, setUsertype] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsertype = localStorage.getItem('usertype');
        if (storedToken && storedUsertype) {
            setToken(storedToken);
            setUsertype(storedUsertype);
            setIsAuthenticated(true);
        }
    }, []);

    const getAccessToken = () => token;

    const authenticate = async (url: string, userDto: { username: string; password: string }, redirectPath: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDto),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('usertype', data.usertype);
            setToken(data.token);
            setUsertype(data.usertype);
            setIsAuthenticated(true);
            navigate(redirectPath);
        } catch (err) {
            setError((err as Error).message);
            setIsAuthenticated(false);
            setToken(null);
            setUsertype(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
        setToken(null);
        setUsertype(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, usertype, getAccessToken, authenticate, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};