import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Doc.css';
import { useSearchParams } from 'react-router-dom';

function Doc() {
    // Get id from query
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

    const [documents, setDocuments] = useState([]);

    // title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Fetch data from backend
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

    // Submit updated data to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:1337/update', {
            id: id,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`http://localhost:1337/delete/${id}`);

        window.location.href = "/";
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
            <button onClick={(e) => handleDelete(id, e)} className="deleteButton">Delete</button>

        </form>
    );
}

export default Doc;
