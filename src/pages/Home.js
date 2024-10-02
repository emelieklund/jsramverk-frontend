import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import FormAddDoc from './FormAddDoc.js';
import '../style/Home.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function Home() {
    // documents is a state variable (needed to retain the data between renders)
    // setDocuments is a setter function (needed to update the variable and trigger React to render the component again)
    const [documents, setDocuments] = useState([]);

    // Fetch data from backend
    const getDocuments = () => {
        fetch(AZURE)
        .then(res => res.json())
        .then(json => setDocuments(json))
    }

    useEffect(() => {
        getDocuments();
    }, [])

    // Delete from backend
    const handleDelete = async (id) => {
        await axios.post(`${AZURE}/delete/${id}`);

        window.location.reload(false);
    }

    return (
        <div className="App">
            <h2>Create a new document</h2>
            <FormAddDoc />
            <h2>Documents</h2>
            {documents.map((data, i) => {
                return <div key={i} className="document">
                    <h3 key={i} ><Link to={`/doc?id=${data._id}`} >{data.title}</Link></h3>
                    <div className="content">{data.content}</div>
                    <button onClick={() => handleDelete(data._id)} className="deleteButton">Delete</button>
                </div>
            })}
        </div>
    );
}

export default Home;
