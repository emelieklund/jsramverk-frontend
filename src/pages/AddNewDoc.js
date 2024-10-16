import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/AddNewDoc.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function AddNewDoc() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(AZURE, {
            title: title,
            content: content
        });

        // Refresh page
        window.location.reload(false);
    }

    return (
        <div className="new-doc-div" >
            <form onSubmit={handleSubmit}>
                <p>Create a new document</p>
                <input
                    id="new-title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddNewDoc;
