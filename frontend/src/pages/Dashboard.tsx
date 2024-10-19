import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-gray-200 rounded shadow">
                    <h3>Total Books Available</h3>
                    <p>150</p>
                </div>
                <div className="p-4 bg-gray-200 rounded shadow">
                    <h3>Total Users</h3>
                    <p>20</p>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;