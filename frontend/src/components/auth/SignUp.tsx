import React from 'react';
import axios from 'axios';
import {RegisterForm} from "../forms/RegisterForm";
import {UserDto} from "../dto/UserDto";
import {Navigate, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
    const {authenticate, loading, error} = useAuth();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        authenticate('http://localhost:8080/auth/register', userDto, '/login');
    };

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