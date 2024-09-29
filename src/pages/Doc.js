import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FormAddDoc.css';
import { useSearchParams } from 'react-router-dom';

function Doc() {
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

    const [documents, setDocuments] = useState([]);

    // title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // catch data from backend
    const getDocuments = async () => {
        await fetch(`http://localhost:1337/${id}`)
        .then(res => res.json())
        .then(json => setDocuments(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDocuments();
    }, []);

    // Update title and content when "documents" is changed
    useEffect(() => {
        setTitle(documents.title);
        setContent(documents.content);
    }, [documents])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:1337/update', {
            id: id,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Title:</p>
            <input
                type="text"
                name="title"
                defaultValue={documents.title}
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <p>Content:</p>
            <textarea
                name="content"
                defaultValue={documents.content}
                onChange={(e) => {setContent(e.target.value)}}
            />
            <input type="submit" value="Update" />
        </form>
    );
}

export default Doc;
