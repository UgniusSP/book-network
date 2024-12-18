import React, { useEffect, useState } from 'react';
import { ClientDetails } from "../components/user/ClientDetails";
import useFetchData from "../hooks/useFetchData";
import { ClientDto } from "../dto/ClientDto";
import { useParams } from 'react-router-dom';
import { Loader } from "../components/loader/Loader";
import { ReviewList } from "../components/review/ReviewList";

type ClientPageProps = {
    title: string;
};

export const ClientPage: React.FC<ClientPageProps> = ({ title }) => {
    const { publicationId } = useParams<{ publicationId: string }>();
    const endpoint = publicationId ? `user/${publicationId}` : 'user';
    const { data: fetchedUser, loading: userLoading } = useFetchData(endpoint);
    const [client, setClient] = useState<ClientDto | null>(null);

    useEffect(() => {
        if (fetchedUser) {
            setClient(fetchedUser);
        }
    }, [fetchedUser]);

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {client && (
                <ClientDetails
                    username={client.username}
                    firstName={client.firstName}
                    lastName={client.lastName}
                    address={client.address}
                    birthdate={client.birthdate}
                />
            )}
            {userLoading && <Loader />}
            {client && <ReviewList variable={client.username} requestMapping='client-review' />}
        </div>
    );
};