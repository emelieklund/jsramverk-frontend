import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../style/Doc.css';

function Doc() {
    // Get id from query
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

    const [document, setDocument] = useState([]);

    // title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Fetch data from backend
    const getDocument = () => {
        fetch(`http://localhost:1337/${id}`)
        .then(res => res.json())
        .then(json => setDocument(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDocument();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update title and content when "document" is changed
    useEffect(() => {
        setTitle(document.title);
        setContent(document.content);
    }, [document])

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
                defaultValue={document.title}
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <p>Content:</p>
            <textarea
                name="content"
                defaultValue={document.content}
                onChange={(e) => {setContent(e.target.value)}}
            />
            <input type="submit" value="Update" />
            <button onClick={(e) => handleDelete(id, e)} className="deleteButton">Delete</button>

        </form>
    );
}

export default Doc;
