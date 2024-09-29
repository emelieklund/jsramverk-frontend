import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import FormAddDoc from './FormAddDoc.js';

function Home() {
    // documents is a state variable (needed to retain the data between renders)
    // setDocuments is a setter function (needed to update the variable and trigger React to render the component again)
    const [documents, setDocuments] = useState([]);

    const getDocuments = () => {
        fetch("http://localhost:1337")
        .then(res => res.json())
        .then(json => setDocuments(json))
    }

    useEffect(() => {
        getDocuments();
    }, [])

    // handle delete function
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1337/${id}`);

        //window.location.reload(false);
    }

    return (
        <div className="App">
            <h2>Create a new document</h2>
            <FormAddDoc />
            <h2>Documents</h2>
            {documents.map((data) => {
                return <>
                    <h3><Link to={`/doc?id=${data._id}`} >{data.title}</Link></h3>
                    <p>{data.content}</p>
                    <button onClick={() => handleDelete(data._id)} className="deleteButton">Delete</button>
                    <hr />
                </>
            })}
        </div>
    );
}

export default Home;
