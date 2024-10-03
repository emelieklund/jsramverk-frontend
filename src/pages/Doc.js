import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/Doc.css';

const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";

function Doc() {
    // Get id from parameter
    const params = useParams();
    const id = params.id;

    const [document, setDocument] = useState([]);

    // Title and content, used when updating document
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/update`, {
            _id: id,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/delete/${id}`);

        window.location.href = "/#";
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title:</label>
            <input
                data-testid="title-input"
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
            <button onClick={(e) => handleDelete(id, e)} className="deleteButton" data-testid="delete-button" >Delete</button>
        </form>
    );
}

export default Doc;
