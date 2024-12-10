import React, { useState } from 'react';

type FilterFormProps = {
    onFilter: (genre: string, language: string) => void;
};

export const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(genre, language);
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Filter</button>
        </form>
    );
};