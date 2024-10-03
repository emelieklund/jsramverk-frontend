import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/FormAddDoc.css';

const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";

function FormAddDoc() {
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title:</label>
            <input
                id="title-input"
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                name="content"
                placeholder="Content..."
                onChange={(e) => {setContent(e.target.value)}}
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default FormAddDoc;
