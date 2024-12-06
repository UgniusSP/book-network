import React from 'react';
import { LoginForm } from '../forms/LoginForm';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from "../loader/Loader";

export const Login: React.FC = () => {
    const [userDto, setUserDto] = React.useState({
        username: '',
        password: ''
    });
    const { authenticate, loading } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await authenticate('http://localhost:8080/auth/login', userDto, '/');
    };

    const handleFieldChange = (field: string, value: string) => {
        setUserDto((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <LoginForm
                    title="Sign In"
                    username={userDto.username}
                    password={userDto.password}
                    onSubmit={handleLogin}
                    onChange={handleFieldChange}
                />
            )}
        </>
    );
};