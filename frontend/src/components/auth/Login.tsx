import React from 'react';
import {UserDto} from "../dto/UserDto";
import {LoginForm} from "../forms/LoginForm";
import useAuth from "../../hooks/useAuth";

export const Login: React.FC = () => {
    const [userDto, setUserDto] = React.useState<UserDto>({
        username: '',
        password: ''
    });
    const {authenticate, loading, error} = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        authenticate('http://localhost:8080/auth/login', userDto, '/');
    }

    const handleFieldChange = (field: string, value: string) => {
        setUserDto((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <LoginForm
            title="Sing In"
            username={userDto.username}
            password={userDto.password}
            onSubmit={handleLogin}
            onChange={handleFieldChange}
        />
    );

}