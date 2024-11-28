import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {CustomButton} from "../buttons/CustomButton";
import {FaHome, FaRegUserCircle, FaSignOutAlt} from "react-icons/fa";

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleAddPublication = () => {
        navigate('/publications');
    }

    const handleHome = () => {
        navigate('/');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <header className="bg-white border text-black p-4 shadow">
            <div className="pl-5 container flex justify-between items-center">
                <h1 onClick={handleHome} className="text-xl font-bold cursor-pointer text-sky-800">Book network</h1>
                <nav className="flex items-center pr-5">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <CustomButton text="Add publication" onClick={handleAddPublication}/>
                        </li>
                        <li>
                            <FaRegUserCircle onClick={handleProfile} size={30} className="cursor-pointer text-sky-800"/>
                        </li>
                        <li>
                            <FaSignOutAlt onClick={handleLogout} size={30} className="cursor-pointer text-sky-800"/>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};