import React from "react";
import { FcOk, FcHighPriority } from "react-icons/fc";
import { PublicationDto } from "../../dto/PublicationDto";

export const PublicationDetails: React.FC<PublicationDto> = ({
                                                                 title,
                                                                 author,
                                                                 publicationDate,
                                                                 language,
                                                                 publicationType,
                                                                 available,
                                                                 image,
                                                                 isbn,
                                                                 genre,
                                                                 pageCount,
                                                                 format,
                                                                 summary,
                                                                 frequency
                                                             }) => {
    return (
        <div className="flex flex-col ml-8 w-fit">
            <h1 className="flex text-2xl font-bold">{title}</h1>
            <div className="mt-3">By
                <span className="underline"> {author}</span>
            </div>
            <div>
                {renderAvailability(available)}
            </div>
            <div className="mt-5">
                <p className="text-sm text-slate-600">{summary}</p>
            </div>
        </div>
    );
}

const renderAvailability = (isAvailable: boolean) => {
    return (
        <div className="mt-3 flex items-center gap-1">
            {isAvailable ? <FcOk /> : <FcHighPriority />}
            <span className={`m-0 ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {isAvailable ? 'Available' : 'Not Available'}
            </span>
        </div>
    );
}