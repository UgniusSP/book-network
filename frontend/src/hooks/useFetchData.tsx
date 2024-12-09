import { useState, useEffect } from 'react';
import {useProtectedAxios} from "./useProtectedAxios";

const useFetchData = (endpoint: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const axios = useProtectedAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint);
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axios, endpoint]);

    return { data, error, loading };
};

export default useFetchData;
