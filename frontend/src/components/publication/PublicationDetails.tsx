import React from "react";
import {FcOk, FcHighPriority} from "react-icons/fc";
import {PublicationDto} from "../../dto/PublicationDto";

export const PublicationDetails: React.FC<PublicationDto> = ({
                                                                 title,
                                                                 author,
                                                                 publicationDate,
                                                                 language,
                                                                 publicationType,
                                                                 available,
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
                {renderAvailability(available || false)}
            </div>
            <div className="mt-5">
                <p className="text-sm text-slate-600">{summary}</p>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300"/>
            <div>
                <h1 className="text-lg font-bold">Publication Details</h1>
                <div className="mt-3">
                    <span className="text-sm text-slate-600">Publication Date: {publicationDate}</span>
                    <span className="block text-sm mt-1 text-slate-600">Language: {language}</span>
                    {publicationType === "BOOK" && (
                        <>
                            <span className="block text-sm mt-1 text-slate-600">ISBN: {isbn}</span>
                            <span className="block text-sm mt-1 text-slate-600">Genre: {genre}</span>
                            <span className="block text-sm mt-1 text-slate-600">Page Count: {pageCount}</span>
                            <span className="block text-sm mt-1 text-slate-600">Format: {format}</span>
                        </>
                    )}
                    {publicationType === "PERIODICAL" && (
                        <span className="block text-sm mt-1 text-slate-600">Frequency: {frequency}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

const renderAvailability = (isAvailable: boolean) => {
    return (
        <div className="mt-3 flex items-center gap-1">
            {isAvailable ? <FcOk/> : <FcHighPriority/>}
            <span className={`m-0 ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {isAvailable ? 'Available' : 'Not Available'}
            </span>
        </div>
    );
}