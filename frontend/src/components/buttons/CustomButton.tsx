import React from 'react';
import {Button} from "@mui/material";

type CustomButtonProps = {
    text: string;
    onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({text, onClick}) => {
    return (
        <Button variant="outlined" onClick={onClick}>{text}</Button>
    );
}