import React from 'react';
import {Box, Button} from "@mui/material";

type PublicationPageRightPanelProps = {
    username: string;
    handleClick: () => void;
}

export const PublicationPageRightPanel: React.FC<PublicationPageRightPanelProps> = ({username, handleClick}) => {
    return (
        <div className="flex w-1/6 flex-col">
            <Button variant="contained">Borrow</Button>
            <Box className="mt-5 p-4 border rounded" sx={{backgroundColor: '#f5f5f5' }}>
                <div className="flex items-center cursor-pointer" onClick={handleClick}>
                    <img src="https://picsum.photos/id/22/200/300" alt="user" className="w-10 h-10 rounded-full mr-2"/>
                    <span className="text-slate-600">{username}</span>
                </div>
            </Box>
        </div>
    );
};