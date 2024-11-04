import React from 'react';
import axios from 'axios';
import {RegisterForm} from "../forms/RegisterForm";
import {UserDto} from "../dto/UserDto";
import {Navigate, useNavigate} from "react-router-dom";

export const SignUp: React.FC = () => {
    const [userDto, setUserDto] = React.useState<UserDto>({
        username: '',
        password: '',
        name: '',
        surname: '',
        address: '',
        birthdate: '',
        userType: 'CLIENT'
    });
    const [token, setToken] = React.useState<string>('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userDto);
            setToken(response.data.access);
            localStorage.setItem('token', response.data.access);

            navigate('/login');
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
        <RegisterForm
            title="Sing Up"
            username={userDto.username}
            password={userDto.password}
            name={userDto.name}
            surname={userDto.surname}
            address={userDto.address}
            birthdate={userDto.birthdate}
            onSubmit={handleSignUp}
            onChange={handleFieldChange}
        />
    );

}