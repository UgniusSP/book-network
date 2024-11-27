import React, { useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [publications, setPublications] = React.useState<number>(0);
    const [users, setUsers] = React.useState<number>(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('http://localhost:8080/publications/count', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setPublications(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/count', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPublications();
        fetchUsers();
    }, [token]);

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