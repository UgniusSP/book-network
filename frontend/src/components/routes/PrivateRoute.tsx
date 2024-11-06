import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/login' />;
    }

    const decodedToken = jwtDecode<{ exp: number }>(token);

    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};
