import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import {useProtectedAxios} from "../hooks/useProtectedAxios";

export const AdminPage: React.FC = () => {
    const { data: fetchedUsers } = useFetchData('/admin/users');
    const { data: fetchedPublications } = useFetchData('/admin/publications');
    const [users, setUsers] = React.useState<any>([]);
    const [publications, setPublications] = React.useState<any>([]);
    const axios = useProtectedAxios();

    useEffect(() => {
        if (fetchedUsers) {
            setUsers(fetchedUsers);
        }
        if (fetchedPublications) {
            setPublications(fetchedPublications);
        }
    }, [fetchedPublications, fetchedUsers]);

    const handleDeleteUser = async (username: string) => {
        try {
            await axios.delete(`/admin/${username}/users`);
            setUsers(users.filter((user: any) => user.username !== username));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleDeletePublication = async (publicationId: string) => {
        try {
            await axios.delete(`/admin/${publicationId}/publications`);
            setPublications(publications.filter((publication: any) => publication.id !== publicationId));
        } catch (error) {
            console.error("Error deleting publication:", error);
        }
    };

    return (
        <div className="my-2 p-4 mx-5">
            <h1 className="text-2xl font-bold mb-4 text-sky-800">Clients</h1>
            <div className="grid grid-cols-1 gap-4">
                {users.map((user: any) => (
                    <div key={user.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{user.username}</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Surname:</strong> {user.surname}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Birthdate:</strong> {user.birthdate}</p>
                        <p><strong>User Type:</strong> {user.userType}</p>
                        <button onClick={() => handleDeleteUser(user.id)} className="mt-2 text-red-500">Delete</button>
                    </div>
                ))}
            </div>
            <h1 className="text-2xl font-bold mb-4 text-sky-800">Publications</h1>
            <div className="grid grid-cols-1 gap-4">
                {publications.map((publication: any) => (
                    <div key={publication.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{publication.title}</h2>
                        <p><strong>Author:</strong> {publication.author}</p>
                        <p><strong>Available:</strong> {publication.available ? 'Yes' : 'No'}</p>
                        <p><strong>Published Date:</strong> {publication.publicationDate}</p>
                        <p><strong>Type:</strong> {publication.publicationType}</p>
                        <button onClick={() => handleDeletePublication(publication.id)} className="mt-2 text-red-500">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}