import React from "react";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from "@mui/material";

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
                <h1 onClick={handleHome} className="text-xl font-semibold cursor-pointer text-sky-800">Book network</h1>
                <nav className="flex items-center pr-5">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Button variant="outlined"
                                    onClick={handleAddPublication}
                                    sx={
                                        {
                                            color: 'sky-800',
                                            borderColor: 'sky-800',
                                            textTransform: 'none',
                                            size: 'small'
                                        }
                                    }>
                                Add publication
                            </Button>
                        </li>
                        <li>
                            <AccountCircleIcon onClick={handleProfile} sx={
                                {
                                    cursor: 'pointer',
                                    fontSize: 25
                                }
                            }/>
                        </li>
                        <li>
                            <LogoutIcon onClick={handleLogout} sx={
                                {
                                    cursor: 'pointer',
                                    fontSize: 25
                                }
                            }/>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};