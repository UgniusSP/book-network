import React from "react";
import { Link } from "react-router-dom"; // Make sure to install react-router-dom if you haven't already

const Sidebar: React.FC = () => {
    return (
        <div className="flex">
            <div className="w-64 bg-gray-800 h-screen text-white">
                <h1 className="text-lg font-bold p-4">Book Network</h1>
                <ul className="space-y-2 p-4">
                    <li>
                        <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className="block p-2 hover:bg-gray-700 rounded">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/publications" className="block p-2 hover:bg-gray-700 rounded">
                            Publications
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
