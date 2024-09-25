import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';

function App() {

    // useEffect(() => {
    //     fetch('http://localhost:1337')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    //     }, []);

    const apiCall = () => {
        axios.get('http://localhost:1337').then((data) => {
            console.log(data.data);
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={apiCall}>Make API Call</button>
            </header>
        </div>
    );
}

export default App;
