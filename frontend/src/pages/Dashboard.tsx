import React from 'react';
import useFetchData from '../hooks/useFetchData';
import {PublicationPreview} from "../components/publication/PublicationPreview";
import {Loader} from "../components/loader/Loader";

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token');
    const { data: publications, error, loading } = useFetchData(
        'http://localhost:8080/publications',
        token
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="my-2 p-4 mx-5">
            <h1 className="text-2xl font-bold mb-4">Recommended for you</h1>
            <div className="grid grid-cols-7">
                {publications.map((publication: any) => (
                    <div key={publication.id}>
                        <PublicationPreview
                            id={publication.id}
                            title={publication.title}
                            author={publication.author}
                            imageData={publication.image}
                            available={publication.available}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
