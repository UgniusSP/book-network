import React from 'react';
import { Box, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';

type FormCardProps = {
    title: string;
    username: string;
    password: string;
    name?: string;
    surname?: string;
    address?: string;
    birthdate?: string;
    phoneNum?: string;
    userType: string;
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
                                                          address = '',
                                                          phoneNum = '',
                                                          userType
                                                      }) => {

    return (
        <div className="flex justify-center items-center h-screen">
            <Box className="p-6 bg-gray-100 rounded shadow w-96">
                <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Username"
                        type="username"
                        value={username}
                        onChange={(e) => onChange('username', e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => onChange('password', e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Name"
                        type="name"
                        value={name}
                        onChange={(e) => onChange('name', e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Surname"
                        type="surname"
                        value={surname}
                        onChange={(e) => onChange('surname', e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Address"
                        type="address"
                        value={address}
                        onChange={(e) => onChange('address', e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <FormControl component="fieldset" margin="normal">
                        <RadioGroup
                            row
                            value={userType}
                            onChange={(e) => onChange('userType', e.target.value)}
                        >
                            <FormControlLabel value="CLIENT" control={<Radio />} label="Client" />
                            <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                    {userType === 'CLIENT' && (
                        <TextField
                            label="Birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => onChange('birthdate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    )}
                    {userType === 'ADMIN' && (
                        <TextField
                            label="Phone Number"
                            type="tel"
                            value={phoneNum}
                            onChange={(e) => onChange('phoneNum', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    )}
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