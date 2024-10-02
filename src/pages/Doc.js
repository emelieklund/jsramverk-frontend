import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../style/Doc.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

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
        fetch(`${AZURE}/${id}`)
        .then(res => res.json())
        .then(json => setDocument(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDocument();

        // eslint-disable-next-line
    }, []);

    // Update title and content when "document" is changed
    useEffect(() => {
        setTitle(document.title);
        setContent(document.content);
    }, [document])

    // Submit updated data to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${AZURE}/update`, {
            _id: id,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    const navigate = useNavigate();

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/delete/${id}`);

        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title:</label>
            <input
                id="title-input"
                type="text"
                name="title"
                defaultValue={document.title}
                onChange={(e) => {setTitle(e.target.value)}}
            />

            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
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
