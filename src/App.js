import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doc from './pages/Doc.js';
import Home from './pages/Home.js';
import NoPage from './pages/NoPage.js';
import './style/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/doc" element={<Doc />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
