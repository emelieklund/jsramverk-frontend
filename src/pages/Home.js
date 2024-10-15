import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import FormAddDoc from './FormAddDoc.js';
import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

// const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function Home() {
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
        <div className="home-div" >
            <AddNewDoc />
            <DocsTable />
        </div>
    );

    // return (
    //     <div className="App" data-testid="doc-div">
    //         <h2>Create a new document</h2>
    //         <FormAddDoc />
    //         <h2>Documents</h2>
    //         {documents.map((data, i) => {
    //             return <div key={i} className="document">
    //                 <h3 key={i} ><Link to={`/doc/${data._id}`} >{data.title}</Link></h3>
    //                 <div className="content">{data.content}</div>
    //                 <button onClick={() => handleDelete(data._id)} className="deleteButton">Delete</button>
    //             </div>
    //         })}
    //     </div>
    // );
}

export default Home;
