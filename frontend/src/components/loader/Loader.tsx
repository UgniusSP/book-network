import React from 'react';
import { CircularProgress } from '@mui/material';

export const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    );
};