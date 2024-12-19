import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom";

import Doc from './pages/Doc.js';
import CreateUser from './pages/CreateUser.js';
import Home from './pages/Home.js';
import Users from './pages/Users.js';
import ShareDoc from './pages/ShareDoc.js';
import NoPage from './pages/NoPage.js';

import './style/App.css';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/doc/:id" element={<Doc />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/share/:id" element={<ShareDoc />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
