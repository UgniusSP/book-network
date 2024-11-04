import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UsersPage from "./components/UsersPage";
import PublicationsPage from "./components/PublicationsPage";
import {Login} from "./components/auth/Login";
import {SignUp} from "./components/auth/SignUp";
import {PrivateRoute} from "./components/routes/PrivateRoute";

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <div className="flex-1 mx-auto">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<SignUp/>}/>

                        <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/users" element={<UsersPage/>}/>
                            <Route path="/publications" element={<PublicationsPage/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
