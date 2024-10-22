import {createPublication, deletePublication, updatePublication, getAllPublications} from "../api/PublicationApi";
import React, {useEffect, useState} from "react";
import { PublicationDto } from "../models/PublicationDto";
import { MdDelete } from "react-icons/md";

const defaultPublicationModel: PublicationDto = {
    title: "",
    author: "",
    isbn: "",
    genre: "",
    pageCount: 0,
    language: "",
    publicationDate: "",
    format: "",
    summary: "",
    editor: "",
    frequency: "",
    issueNumber: 0,
    publicationType: "BOOK",
}

const PublicationsPage: React.FC = () => {
    const [publications, setPublications] = useState<PublicationDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [publicationModel, setPublicationModel] = useState<PublicationDto>(defaultPublicationModel);

    useEffect(() => {
        const loadPublications = async () => {
            try {
                const publicationData = await getAllPublications();
                setPublications(publicationData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        loadPublications().then(r => r);
    }, []);

    const handleCreatePublication = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPublication(publicationModel);
            setSuccessMessage("Publication created successfully!");
            setFormError(null);
            resetForm();
            const updatedPublications = await getAllPublications();
            setPublications(updatedPublications);
        } catch (error: any) {
            setFormError(error.message);
            setSuccessMessage(null);
        }
    };

    const handleUpdatePublication = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updatePublication(publicationModel.title, publicationModel);
            setSuccessMessage("Publication updated successfully!");
            setFormError(null);
            resetForm();
            const updatedPublications = await getAllPublications();
            setPublications(updatedPublications);
        } catch (error: any) {
            setFormError(error.message);
            setSuccessMessage(null);
        }
    };

    const handleDelete = async (title: string) => {
        try {
            await deletePublication(title);
            setSuccessMessage("Publication deleted successfully!");
            setPublications(publications.filter((publication) => publication.title !== title));
            resetForm();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleEdit = (publication: PublicationDto) => {
        setPublicationModel({
            title: publication.title,
            author: publication.author,
            publicationDate: publication.publicationDate,
            language: publication.language,
            isbn: publication.isbn ?? "",
            genre: publication.genre ?? "",
            pageCount: publication.pageCount ?? 0,
            format: publication.format ?? "",
            summary: publication.summary ?? "",
            editor: publication.editor ?? "",
            frequency: publication.frequency ?? "",
            issueNumber: publication.issueNumber ?? 0,
            publicationType: publication.publicationType,
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setPublicationModel(defaultPublicationModel);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPublicationModel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            {formError && <p className="text-red-500 text-center">{formError}</p>}

            <form className="bg-gray-100 shadow-md rounded px-6 py-4 mb-4">
                <h2 className="text-xl font-bold mb-4">Publication Management</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Publication Type</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            name="publicationType"
                            value="BOOK"
                            checked={publicationModel.publicationType === "BOOK"}
                            onChange={handleChange}
                            className="mr-2"
                            disabled={isEditing}
                        />
                        <label className="mr-4">Book</label>
                        <input
                            type="radio"
                            name="publicationType"
                            value="PERIODICAL"
                            onChange={handleChange}
                            checked={publicationModel.publicationType === "PERIODICAL"}
                            className="mr-2"
                            disabled={isEditing}
                        />
                        <label>Periodical</label>
                    </div>
                </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={publicationModel.title}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="author">Author</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                value={publicationModel.author}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="publicationDate">Publication
                                Date</label>
                            <input
                                type="date"
                                name="publicationDate"
                                id="publicationDate"
                                value={publicationModel.publicationDate}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold mb-1" htmlFor="publicationDate">Language</label>
                            <input
                                type="text"
                                name="language"
                                id="language"
                                value={publicationModel.language}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>

                        {publicationModel.publicationType === "BOOK" && (
                            <>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="isbn">ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        id="isbn"
                                        value={publicationModel.isbn}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="genre">Genre</label>
                                    <input
                                        type="text"
                                        name="genre"
                                        id="genre"
                                        value={publicationModel.genre}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="pageCount">Pages</label>
                                    <input
                                        type="number"
                                        name="pageCount"
                                        id="pageCount"
                                        value={publicationModel.pageCount}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="format">Format</label>
                                    <input
                                        type="text"
                                        name="format"
                                        id="format"
                                        value={publicationModel.format}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold mb-1" htmlFor="summary">Summary</label>
                                    <input
                                        type="text"
                                        name="summary"
                                        id="summary"
                                        value={publicationModel.summary}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>

                            </>
                        )}

                        {publicationModel.publicationType === "PERIODICAL" && (
                            <>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="editor">Editor</label>
                                    <input
                                        type="text"
                                        name="editor"
                                        id="editor"
                                        value={publicationModel.editor}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1"
                                           htmlFor="frequency">Frequency</label>
                                    <input
                                        type="text"
                                        name="frequency"
                                        id="frequency"
                                        value={publicationModel.frequency}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold mb-1" htmlFor="issueNumber">Issue
                                        Number</label>
                                    <input
                                        type="number"
                                        name="issueNumber"
                                        id="issueNumber"
                                        value={publicationModel.issueNumber}
                                        onChange={handleChange}
                                        className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-3 text-right">
                        <div className="flex justify-end space-x-2">
                            <button
                                type="submit"
                                onClick={resetForm}
                                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleUpdatePublication}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none"
                            >
                                Update User
                            </button>
                            <button
                                type="submit"
                                onClick={handleCreatePublication}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none"
                            >
                                Create Publication
                            </button>
                        </div>
                    </div>
            </form>


            <h1 className="text-2xl font-bold mb-4 text-center">All Publications</h1>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md mb-4">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 border-b text-left">Title</th>
                            <th className="py-3 px-6 border-b text-left">Author</th>
                            <th className="py-3 px-6 border-b text-left">Year</th>
                            <th className="py-3 px-6 border-b text-left">Publication Type</th>
                            <th className="py-3 px-4 border-b text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {publications.map((publication, index) => (
                            <tr key={publication.title}
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100 transition-colors duration-200`}
                                onClick={() => handleEdit(publication)}>
                                <td className="py-2 px-6 border-b text-left">{publication.title}</td>
                                <td className="py-2 px-6 border-b text-left">{publication.author}</td>
                                <td className="py-2 px-6 border-b text-left">{publication.publicationDate}</td>
                                <td className="py-2 px-6 border-b text-left">{publication.publicationType}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(publication.title)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete Publication"
                                    >
                                        <MdDelete/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PublicationsPage;
