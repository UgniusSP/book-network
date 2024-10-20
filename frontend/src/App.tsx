import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from "./components/Users";
import Publications from "./components/Publications";

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/publications" element={<Publications />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
