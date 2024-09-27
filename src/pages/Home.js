import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Home.css';
import FormAddDoc from './FormAddDoc.js';
import Doc from './Doc.js';

function Home() {
    // documents is a state variable (needed to retain the data between renders)
    // setDocuments is a setter function (needed to update the variable and trigger React to render the component again)
    const [documents, setDocuments] = useState([{
        id: "",
        title: "",
        content: "",
    }])

    // catch data from backend
    useEffect(() => {
        axios.get('http://localhost:1337')
            .then(response => setDocuments(response.data))
            .catch(error => console.error(error));
    }, [])

    // handle delete function
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1337/${id}`);
    }

    const handleLink = async (id, e) => {
        //const data = await axios.get(`http://localhost:1337/${id}`);
        <Route path="/:id" element={<Doc id={id} />} />
    }

    const listItems = documents.map(item => (
        <li key={item._id}>
            <a onClick={() => handleLink(item._id)}>
                <h3>{item.title}</h3>
            </a>
            <p>ID: {item._id}</p>
            <p>Content: {item.content}</p>
            <button onClick={() => handleDelete(item._id)} className="deleteButton">Delete</button>
            <hr />
        </li>
    ));

    return (
        <div className="App">
            <h2>Skapa nytt dokument</h2>
            <FormAddDoc />
            <h2>Dokument</h2>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Home;
