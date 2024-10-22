import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UsersPage from "./components/UsersPage";
import PublicationsPage from "./components/PublicationsPage";

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/publications" element={<PublicationsPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
