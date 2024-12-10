import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Header } from "./components/header/Header";
import { PublicationPage } from "./pages/PublicationPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {PublicationAdditionForm} from "./components/publication/PublicationAdditionForm";
import {ClientPage} from "./pages/ClientPage";
import {AdminPage} from "./pages/AdminPage";

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <MainContent />
            </AuthProvider>
        </Router>
    );
};

const MainContent: React.FC = () => {
    const location = useLocation();
    const hideHeader = location.pathname === '/login' || location.pathname === '/register';
    const {usertype} = useAuth();

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={usertype === 'ADMIN' ? <AdminPage /> : <Dashboard />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/publications/:id" element={<PublicationPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/add-publication" element={<PublicationAdditionForm />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<ClientPage title="My profile" />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/users/:publicationId" element={<ClientPage title="Client page" />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
