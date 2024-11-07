import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function User() {
    // Used when logged in
    const [token, setToken] = useState("");
    const [signedInUser, setSignedInUser] = useState("");

    // Get token
    const getToken = () => {
        fetch(`${AZURE}/posts/token`)
        .then(res => res.json())
        .then(json => (
            [setToken(json.token), setSignedInUser(json.user)]
        ))
        .catch((error) => console.log("Error: ", error))
    }

    const handleSignOut = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/auth/logout`);

        window.location.reload(false);
    };

    useEffect(() => {
        getToken();

    }, [handleSignOut])

    const handleDeregister = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/users/deregister_user`, { email: signedInUser })
        .catch((error) => {
            console.log(error)
        });

        alert("User was successfully deregistered!");

        window.location.reload(false);
    }

    return (
        <div className="home-div" >
            <h2>Welcome, {signedInUser}!</h2>
            <div className="new-doc-div" >
                <AddNewDoc />
                <button onClick={handleSignOut} id="sign-out-btn">Sign out</button>
                <button onClick={handleDeregister} id="deregister-btn" >Deregister</button>
            </div>
            <DocsTable />
        </div>
    );
}

export default User;
