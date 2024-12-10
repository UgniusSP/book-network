import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { PublicationPreview } from "../components/publication/PublicationPreview";
import { Loader } from "../components/loader/Loader";
import { FilterForm } from '../components/forms/FilterForm';
import {useProtectedAxios} from "../hooks/useProtectedAxios";

const Dashboard: React.FC = () => {
    const { data: publications, error, loading } = useFetchData('/publications');
    const [filteredPublications, setFilteredPublications] = useState(publications);
    const axios = useProtectedAxios();

    const handleFilter = async (genre: string, language: string) => {
        try {
            const response = await axios.get('publications/filter', {
                params: { genre, language }
            });
            setFilteredPublications(response.data);
        } catch (error) {
            console.error('Error fetching filtered publications:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="my-2 p-4 mx-5">
            <FilterForm onFilter={handleFilter} />
            <h1 className="text-2xl font-bold mb-4">Recommended for you</h1>
            <div className="grid grid-cols-7">
                {(filteredPublications || publications).map((publication: any) => (
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