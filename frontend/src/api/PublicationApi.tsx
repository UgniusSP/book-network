import { PublicationDto } from '../models/PublicationDto';

export const getAllPublications = async (): Promise<PublicationDto[]> => {
    const response = await fetch('http://localhost:8080/publications');
    if (!response.ok) {
        throw new Error('Failed to fetch publications');
    }
    return await response.json();
};

export const createPublication = async (publication: PublicationDto): Promise<void> => {
    const response = await fetch("http://localhost:8080/publications/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(publication),
    });

    if (!response.ok) {
        throw new Error("Failed to create publication");
    }
};

export const deletePublication = async (title: any) => {
    const response = await fetch(`http://localhost:8080/publications/${title}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete publication');
    }
};

export const updatePublication = async (title: any, publication: PublicationDto) => {
    const response = await fetch(`http://localhost:8080/publications/${title}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(publication),
    });

    if (!response.ok) {
        throw new Error('Failed to update publication');
    }
}

export const getPublicationCount = async (): Promise<number> => {
    const response = await fetch('http://localhost:8080/publications/count');
    if (!response.ok) {
        throw new Error('Failed to fetch publication count');
    }
    return await response.json();
}