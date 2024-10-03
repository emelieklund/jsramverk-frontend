import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import App from './App.js';
import Footer from './Footer';
import './style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>
);
