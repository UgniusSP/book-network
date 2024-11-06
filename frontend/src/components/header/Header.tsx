import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-blue-500 text-white p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Book network</h1>
                <nav className="flex items-center space-x-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/publications" className="hover:underline">My publications</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:underline">Profile</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="hover:underline">Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};