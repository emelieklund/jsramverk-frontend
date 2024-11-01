import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/AddNewDoc.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function AddNewDoc() {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts`, {
            title: title,
            content: ""
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        });

        // Refresh page
        window.location.reload(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Create a new document</p>
            <input
                id="new-title"
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => {setTitle(e.target.value)}}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddNewDoc;
