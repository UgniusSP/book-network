import React from 'react';
import axios from 'axios';
import {UserDto} from "../dto/UserDto";
import {LoginForm} from "../forms/LoginForm";
import {useNavigate} from "react-router-dom";

export const Login: React.FC = () => {
    const [userDto, setUserDto] = React.useState<UserDto>({
        username: '',
        password: ''
    });
    const [token, setToken] = React.useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', userDto);

            setToken(response.data);
            localStorage.setItem('token', response.data);

            navigate('/');
        } catch (e) {
            console.error(e);
        }
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