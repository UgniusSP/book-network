import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Adjust the path if needed
import Dashboard from './pages/Dashboard';
import Users from "./components/Users"; // Adjust the path if needed

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 p-4">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
