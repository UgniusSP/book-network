import React from 'react';
import useFetchData from '../hooks/useFetchData';
import {PublicationPreview} from "../components/publication/PublicationPreview";

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token');
    const { data: publications, error: error, loading: loading } = useFetchData(
        'http://localhost:8080/publications',
        token
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 my-4 p-4">
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
