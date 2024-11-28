import React from 'react';
import useFetchData from '../hooks/useFetchData';

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token');

    const { data: publications, error: pubError, loading: pubLoading } = useFetchData(
        'http://localhost:8080/publications/count',
        token
    );

    const { data: users, error: userError, loading: userLoading } = useFetchData(
        'http://localhost:8080/users/count',
        token
    );

    if (pubError || userError) {
        return <div>Error: {pubError || userError}</div>;
    }

    if (pubLoading || userLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 my-4 p-4">
                <div className="p-4 bg-gray-200 rounded shadow">
                    <h3>Total Publications Available</h3>
                    <p>{publications}</p>
                </div>
                <div className="p-4 bg-gray-200 rounded shadow">
                    <h3>Total Users</h3>
                    <p>{users}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
