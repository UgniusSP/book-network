import React, { useEffect, useState } from "react";
import { fetchAllUsers, createUser, deleteUser, User } from "../api/UserApi";
import { UserModel } from "../models/UserModel";

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userDto, setUserDto] = useState<UserModel>({
        username: "",
        address: "",
        birthdate: "",
        name: "",
        password: "",
        phoneNum: "",
        surname: "",
        userType: "CLIENT",
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchAllUsers();
                setUsers(usersData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        loadUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(userDto);
            setSuccessMessage("User created successfully!");
            setFormError(null);
            setUserDto({
                username: "",
                address: "",
                birthdate: "",
                name: "",
                password: "",
                phoneNum: "",
                surname: "",
                userType: "CLIENT",
            });

            const updatedUsers = await fetchAllUsers();
            setUsers(updatedUsers);
        } catch (error: any) {
            setFormError(error.message);
            setSuccessMessage(null);
        }
    };

    const handleDelete = async (username: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await deleteUser(username); // Call the API to delete the user
                setUsers(users.filter((user) => user.username !== username)); // Update local state
            } catch (error) {
                setError((error as Error).message);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {formError && <p className="text-red-500">{formError}</p>}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-4 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            name="userType"
                            value="CLIENT"
                            onChange={handleChange}
                            checked={userDto.userType === "CLIENT"}
                            className="mr-2"
                        />
                        <label className="mr-4">Client</label>
                        <input
                            type="radio"
                            name="userType"
                            value="ADMIN"
                            onChange={handleChange}
                            checked={userDto.userType === "ADMIN"}
                            className="mr-2"
                        />
                        <label>Admin</label>
                    </div>
                </div>

                <h2 className="text-lg font-bold mb-2">User Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={userDto.username}
                            onChange={handleChange}
                            className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userDto.password}
                            onChange={handleChange}
                            className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={userDto.name}
                            onChange={handleChange}
                            className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            value={userDto.surname}
                            onChange={handleChange}
                            className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    {userDto.userType === "CLIENT" && (
                        <>
                            <div className="col-span-2 mb-4">
                                <label className="block text-sm font-bold mb-1" htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={userDto.address}
                                    onChange={handleChange}
                                    className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="col-span-2 mb-6">
                                <label className="block text-sm font-bold mb-1" htmlFor="birthdate">Birthdate</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    id="birthdate"
                                    value={userDto.birthdate}
                                    onChange={handleChange}
                                    className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {userDto.userType === "ADMIN" && (
                        <div className="col-span-2 mb-4">
                            <label className="block text-sm font-bold mb-1" htmlFor="phoneNum">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNum"
                                id="phoneNum"
                                value={userDto.phoneNum}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="mt-3 text-right">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none">
                        Create User
                    </button>
                </div>
            </form>

            <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md mb-4">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Surname</th>
                            <th className="py-3 px-4 border-b text-left">User Type</th>
                            <th className="py-3 px-4 border-b text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.username}
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100 transition-colors duration-200`}>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.surname}</td>
                                <td className="py-2 px-4 border-b">{user.userType}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(user.username)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete User"
                                    >
                                        🗑️ {/* Recycle bin icon (Unicode character) */}
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

export default UsersPage;