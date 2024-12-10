import React, { useState } from 'react';

type FilterFormProps = {
    onFilter: (genre: string, language: string, publicationType: string) => void;
};

export const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [publicationType, setPublicationType] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(genre, language, publicationType);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border p-2 rounded"
            />
            <select
                value={publicationType}
                onChange={(e) => setPublicationType(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="">Select Publication Type</option>
                <option value="BOOK">BOOK</option>
                <option value="PERIODICAL">PERIODICAL</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Filter</button>
        </form>
    );
};