import React, {useEffect} from 'react';
import {getPublicationCount} from "../api/PublicationApi";
import {getUserCount} from "../api/UserApi";

const Dashboard: React.FC = () => {
    const [publications, setPublications] = React.useState<number>(0);
    const [users, setUsers] = React.useState<number>(0);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const count = await getPublicationCount();
                setPublications(count);
            } catch (e){
                console.error(e);
            }
        };
        const fetchUsers = async () => {
            try {
                const count = await getUserCount();
                setUsers(count);
            } catch (e){
                console.error(e);
            }
        }

        fetchPublications();
        fetchUsers()
    }, []);


    return (
        <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-gray-200 rounded shadow">
                    <h3>Total Books Available</h3>
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