import { useState } from 'react';
import { useProtectedAxios } from './useProtectedAxios';

const usePostData = (endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);
    const axios = useProtectedAxios();

    const postData = async (data: any) => {
        setLoading(true);
        setError(null);

        try {
            const headers: { [key: string]: string } = {};
            if (!(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const res = await axios.post(endpoint, data, { headers });
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
