import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/AddNewDoc.css';

import BASE_URL from './base_url.js';

function AddNewDoc() {
    const [title, setTitle] = useState("");
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${BASE_URL}/posts`, {
            title: title,
            content: "",
            user: user
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
