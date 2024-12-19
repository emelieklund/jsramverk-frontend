import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import '../style/ShareDoc.css';

import BASE_URL from './base_url.js';

function ShareDoc() {
    // Get document id from parameter
    const params = useParams();
    const documentID = params.id;

    const [email, setEmail] = useState("");

    const token = localStorage.getItem("token");

    const postData = async () => {
        // Add collaborator
        await axios.post(`${BASE_URL}/posts/update_collaborator`, {
            _id: documentID,
            email: email
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

        // Send invite via email
        axios.post(`${BASE_URL}/sendgrid/invite_user`, { email: email }, {
            headers: {
                'x-access-token': token
            }
        });

        window.location.reload(false);
    }

    return (
        <div className="share-doc-div">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <button id="send-invite-btn" onClick={() => postData()} >
                Send invite
            </button>
        </div>
    )
}
export default ShareDoc;
