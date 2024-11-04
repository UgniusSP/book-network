import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, deleteUser, updateUser} from "../api/UserApi";
import { UserDto } from "./dto/UserDto";
import { MdDelete } from "react-icons/md";

const defaultUserModel: UserDto = {
    username: "",
    address: "",
    birthdate: "",
    name: "",
    password: "",
    phoneNum: "",
    surname: "",
    userType: "CLIENT",
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userModel, setUserModel] = useState<UserDto>(defaultUserModel);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        loadUsers().then(r => r);
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(userModel);
            setSuccessMessage("User created successfully!");
            setFormError(null);
            resetForm();
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
        } catch (error: any) {
            setFormError(error.message);
            setSuccessMessage(null);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser(userModel.username, userModel);
            setSuccessMessage("User updated successfully!");
            setFormError(null);
            resetForm();
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
        } catch (error: any) {
            setFormError(error.message);
            setSuccessMessage(null);
        }
    };

    const handleDelete = async (username: string) => {
        try {
            await deleteUser(username);
            setSuccessMessage("User deleted successfully!");
            setUsers(users.filter((user) => user.username !== username));
            resetForm();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleEdit = (user: UserDto) => {
        setUserModel({
            username: user.username,
            address: user.address ?? "",
            birthdate: user.birthdate ?? "",
            name: user.name,
            password: user.password,
            phoneNum: user.phoneNum ?? "",
            surname: user.surname,
            userType: user.userType,
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setUserModel(defaultUserModel);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserModel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {formError && <p className="text-red-500">{formError}</p>}

            <form className="bg-gray-100 shadow-md rounded px-6 py-4 mb-4">
                <h2 className="text-xl font-bold mb-4">User Management</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            name="userType"
                            value="CLIENT"
                            checked={userModel.userType === "CLIENT"}
                            onChange={handleChange}
                            className="mr-2"
                            disabled={isEditing}
                        />
                        <label className="mr-4">Client</label>
                        <input
                            type="radio"
                            name="userType"
                            value="ADMIN"
                            onChange={handleChange}
                            checked={userModel.userType === "ADMIN"}
                            className="mr-2"
                            disabled={isEditing}
                        />
                        <label>Admin</label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={userModel.username}
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
                            value={userModel.password}
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
                            value={userModel.name}
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
                            value={userModel.surname}
                            onChange={handleChange}
                            className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    {userModel.userType === "CLIENT" && (
                        <>
                            <div className="col-span-2 mb-4">
                                <label className="block text-sm font-bold mb-1" htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={userModel.address}
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
                                    value={userModel.birthdate}
                                    onChange={handleChange}
                                    className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {userModel.userType === "ADMIN" && (
                        <div className="col-span-2 mb-4">
                            <label className="block text-sm font-bold mb-1" htmlFor="phoneNum">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNum"
                                id="phoneNum"
                                value={userModel.phoneNum}
                                onChange={handleChange}
                                className="w-full border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>
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
                            onClick={handleUpdateUser}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none"
                        >
                            Update User
                        </button>
                        <button
                            type="submit"
                            onClick={handleCreateUser}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none"
                        >
                            Create User
                        </button>
                    </div>
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
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100 transition-colors duration-200`}
                                onClick={() => handleEdit(user)}>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.surname}</td>
                                <td className="py-2 px-4 border-b">{user.userType}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(user.username)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete User"
                                    >
                                        <MdDelete />
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
