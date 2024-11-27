import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { Header } from "./components/header/Header";

const App: React.FC = () => {
    return (
        <Router>
            <MainContent />
        </Router>
    );
};

const MainContent: React.FC = () => {
    const location = useLocation();
    const hideHeader = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideHeader && <Header />}
            <div className="flex flex-col min-h-screen">
                <div className="flex-1 mx-auto">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
