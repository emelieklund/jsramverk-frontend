import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './FormAddDoc.css';

function FormAddDoc() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:1337', {
            title: title,
            content: content
        });

        // Refresh page
        window.location.reload(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Title:</p>
            <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <p>Content:</p>
            <textarea
                name="content"
                placeholder="Content..."
                onChange={(e) => {setContent(e.target.value)}}
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default FormAddDoc;
