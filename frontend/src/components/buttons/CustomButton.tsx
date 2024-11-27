import React from 'react';

type CustomButtonProps = {
    text: string;
    onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({text, onClick}) => {
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {text}
        </button>
    );
}