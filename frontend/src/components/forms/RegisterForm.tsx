import React from 'react';
import {Box, Button} from "@mui/material";
import {TextFieldComp} from "./TextFieldComp";
import {Link} from "react-router-dom";

type FormCardProps = {
    title: string;
    username: string;
    password: string;
    name?: string;
    surname?: string;
    address?: string;
    birthdate?: string;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (field: string, value: string) => void;
}

export const RegisterForm: React.FC<FormCardProps> = ({
                                                          title,
                                                          onSubmit,
                                                          onChange,
                                                          username,
                                                          password,
                                                          name = '',
                                                          surname = '',
                                                          birthdate = '',
                                                          address = ''
                                                      }) => {

    return (
        <div className="flex justify-center items-center h-screen border">
            <Box className="p-6 bg-gray-100 rounded shadow w-96">
                <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
                <form onSubmit={onSubmit}>
                    <TextFieldComp label="Username" type="username" value={username}
                                   onChange={(e) => onChange('username', e.target.value)}/>
                    <TextFieldComp label="Password" type="password" value={password}
                                   onChange={(e) => onChange('password', e.target.value)}/>
                    <TextFieldComp label="Name" type="name" value={name}
                                   onChange={(e) => onChange('name', e.target.value)}/>
                    <TextFieldComp label="Surname" type="surname" value={surname}
                                   onChange={(e) => onChange('surname', e.target.value)}/>
                    <TextFieldComp label="Address" type="address" value={address}
                                   onChange={(e) => onChange('address', e.target.value)}/>
                    <TextFieldComp label="Birthdate" type="birthdate" value={birthdate}
                                   onChange={(e) => onChange('birthdate', e.target.value)}/>
                    <div className="flex justify-center">
                        <Button variant="contained" color="primary" type="submit">
                            Sign Up
                        </Button>
                    </div>
                    <div className="mt-5 text-center">
                        <p>Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link></p>
                    </div>
                </form>
            </Box>
        </div>
    );
}
