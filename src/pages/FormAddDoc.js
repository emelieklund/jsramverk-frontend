import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './FormAddDoc.css';

function FormAddDoc() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:1337', {
            title: title,
            content: content
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Titel:</p>
            <input
                type="text"
                name="title"
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <p>Innehåll:</p>
            <textarea
                name="content"
                onChange={(e) => {setContent(e.target.value)}}
            />
            <input type="submit" value="Spara" />
        </form>
    );
}

export default FormAddDoc;
