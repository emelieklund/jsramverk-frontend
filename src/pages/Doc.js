import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FormAddDoc.css';

function Doc(props) {
    const [documents, setDocuments] = useState([{
        id: "",
        title: "",
        content: "",
    }])

    // catch data from backend
    useEffect(() => {
        axios.get(`http://localhost:1337/${props.id}`)
            .then(response => setDocuments(response.data))
            .catch(error => console.error(error));
    }, [])

    console.log(documents.id);

    return (
        <form>
            <p>Titel:</p>
            <input
                type="text"
                name="title"
            />

            <p>Innehåll:</p>
            <textarea
                name="content"
            />
            <input type="submit" value="Spara" />
        </form>
    );
}

export default Doc;
