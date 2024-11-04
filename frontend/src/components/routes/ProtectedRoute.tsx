import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactNode; // Change from component to element
    path: string;
    exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            element={token ? element : <Navigate to="/login" />} // Use element prop directly
        />
    );
};

export default ProtectedRoute;
