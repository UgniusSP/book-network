import { useState } from 'react';
import axios from 'axios';

const usePostData = (endpoint: string, token: string | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);

    const postData = async (data: any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            setError('Token is required');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setResponse(res.data);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, response, postData };
};

export default usePostData;
