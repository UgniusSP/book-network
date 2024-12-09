import {useContext, useMemo} from "react";
import {AuthContext} from "../contexts/AuthContext";
import axios from "axios";

export const useProtectedAxios = () => {
    const { getAccessToken } = useContext(AuthContext)!;

    return useMemo(() => {
        return axios.create({
            baseURL: "http://localhost:8080",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }, [getAccessToken]);
};
