import { UserModel } from "../models/UserModel";

export const fetchAllUsers = async (): Promise<UserModel[]> => {
    const response = await fetch("http://localhost:8080/users");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
};

export const createUser = async (user: UserModel): Promise<void> => {
    const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }
};

export const deleteUser = async (username: any) => {
    const response = await fetch(`http://localhost:8080/users/${username}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
};

export const updateUser = async (username: any, user: UserModel) => {
    const response = await fetch(`http://localhost:8080/users/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }
}


