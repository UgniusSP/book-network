import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint: string, token: string | null) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError('Token is required');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, token]);

    return { data, error, loading };
};

export default useFetchData;
