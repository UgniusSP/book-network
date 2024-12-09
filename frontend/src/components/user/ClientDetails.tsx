import React from 'react';
import {ClientDto} from "../../dto/ClientDto";

export const ClientDetails: React.FC<ClientDto> = ({ username, firstName, lastName, address, birthdate }) => {
    return (
        <div className="p-4 border rounded bg-gray-100">
            <h1 className="text-lg font-bold">Client Details</h1>
            <p className="mt-2">Username: {username}</p>
            <p className="mt-2">First Name: {firstName}</p>
            <p className="mt-2">Last Name: {lastName}</p>
            <p className="mt-2">Address: {address}</p>
            <p className="mt-2">Birthdate: {birthdate}</p>
        </div>
    );
};