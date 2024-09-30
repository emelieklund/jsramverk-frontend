import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Doc from './pages/Doc.js';
import Home from './pages/Home.js';
import NoPage from './pages/NoPage.js';
import './style/App.css';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/doc" element={<Doc />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
