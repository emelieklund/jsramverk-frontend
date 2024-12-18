import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/AddNewDoc.css';

const BASE_URL="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
//const BASE_URL="http://localhost:1337";

function AddNewDoc({token}) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${BASE_URL}/posts`, {
            title: title,
            content: ""
        }, {
            headers: {
                'x-access-token': token
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        });

        // Refresh page
        window.location.reload(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Create a new document</p>
            <input
                id="new-title"
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => {setTitle(e.target.value)}}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddNewDoc;
