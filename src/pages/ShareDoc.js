import axios from 'axios';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useState } from 'react';
import '../style/ShareDoc.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function ShareDoc() {
    // Get id from parameter
    const params = useParams();
    const documentID = params.id;

    const [collaborator, setCollaborator] = useState("");

    // Message when share fails
    const [message, setMessage] = useState("test");

    const handleSendInvite = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts/update_collaborator`, {
            _id: documentID,
            email: collaborator
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data.message);
                setMessage(error.response.data.message)
            }
        });

        // Refresh page
        //window.location.reload(false);
    }

    return (
        <div className="home-div" >
            <div className="share-doc-div" >
                <form onSubmit={handleSendInvite}>
                    <p>Enter email to share document with:</p>
                    <input
                        id="share-doc"
                        type="text"
                        name="share-doc"
                        placeholder="Email"
                        onChange={(e) => {setCollaborator(e.target.value)}}
                        required
                    />
                    <input type="submit" value="Submit" />
                </form>
                <p className="message">{message}</p>
            </div>
        </div>
    );
}

export default ShareDoc;
