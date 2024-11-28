import React from "react";
import { useNavigate } from "react-router-dom";

type PublicationPreviewProps = {
    id: number;
    title: string;
    author: string;
    imageData: string;
    available: boolean;
};

export const PublicationPreview: React.FC<PublicationPreviewProps> = ({
                                                            id,
                                                            imageData,
                                                            title,
                                                            author,
                                                            available,
                                                        }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/books/${id}`);
    };

    return (
        <div
            className="flex-col w-44 gap-2.5 h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-105"
        >
            <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt={title}
                onClick={handleClick}
                className="w-full h-72 rounded-md cursor-pointer"
            />
            <div className="flex flex-col items-start text-left gap-1 overflow-hidden">
                <p
                    onClick={handleClick}
                    className="font-bold m-0 w-40 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                >
                    {title}
                </p>
                <p className="text-sm underline text-gray-500 m-0 w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                    {author}
                </p>
                <p className="m-0 text-sm">{isAvailable(available)}</p>
            </div>
        </div>
    );
};

const isAvailable = (available?: boolean) => {
    return (
        <span className={`m-0 ${available ? "text-green-500" : "text-red-500"}`}>
      {available ? "Available" : "Not Available"}
    </span>
    );
};
