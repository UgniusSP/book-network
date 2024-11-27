import React from 'react';
import {Box, Button} from "@mui/material";
import {TextFieldComp} from "./TextFieldComp";
import {Link} from "react-router-dom";

type FormCardProps = {
    title: string;
    username: string;
    password: string;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (field: string, value: string) => void;
}

export const LoginForm: React.FC<FormCardProps> = ({title, onSubmit, onChange, username, password}) => {

    return (
        <div className="flex justify-center items-center h-screen">
            <Box className="p-6 bg-gray-100 rounded shadow w-96">
                <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
                <form onSubmit={onSubmit}>
                    <TextFieldComp label="Username" type="username" value={username}
                                   onChange={(e) => onChange('username', e.target.value)}/>
                    <TextFieldComp label="Password" type="password" value={password}
                                   onChange={(e) => onChange('password', e.target.value)}/>
                    <div className="flex justify-center">
                        <Button variant="contained" color="primary" type="submit">
                            Sign In
                        </Button>
                    </div>
                    <div className="mt-5 text-center">
                        <p>Don't have an account yet? <Link to="/register" className="text-blue-500">Sign Up</Link></p>
                    </div>
                </form>
            </Box>
        </div>
    );
}
