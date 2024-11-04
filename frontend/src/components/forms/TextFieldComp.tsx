import React from 'react';
import { TextField } from "@mui/material";

type TextFieldProps = {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextFieldComp: React.FC<TextFieldProps> = ({ label, type, value, onChange}) => {
    return (
        <div className="mb-4">
            <TextField
                label={label}
                type={type}
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
            />
        </div>
    );
}