import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const authenticate = async (endpoint: string, userDto: any, redirectPath: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(endpoint, userDto);
            const token = response.data.token || response.data.access;

            if (token) {
                localStorage.setItem('token', token);
            }

            navigate(redirectPath);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { authenticate, loading, error };
};

export default useAuth;
