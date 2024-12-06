import React from 'react';
import { RegisterForm } from '../forms/RegisterForm';
import { UserDto } from '../../dto/UserDto';
import {useAuth} from "../../contexts/AuthContext";

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
    const { authenticate, loading, error } = useAuth();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDto),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            await authenticate('http://localhost:8080/auth/login', userDto, '/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        setUserDto((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <RegisterForm
                title="Sign Up"
                username={userDto.username}
                password={userDto.password}
                name={userDto.name}
                surname={userDto.surname}
                address={userDto.address}
                birthdate={userDto.birthdate}
                onSubmit={handleSignUp}
                onChange={handleFieldChange}
            />
        </>
    );
};
