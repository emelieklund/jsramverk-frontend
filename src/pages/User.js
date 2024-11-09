import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function User({token}) {
    // Shows email of signed in user
    const [signedInUser, setSignedInUser] = useState("");

    // Get signed in user
    const getUser = () => {
        fetch(`${AZURE}/posts/token`)
        .then(res => res.json())
        .then(json => (
            setSignedInUser(json.user)
        ))
        .catch((error) => console.log("Error: ", error))
    }

    // eslint-disable-next-line
    const handleSignOut = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/auth/logout`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        window.location.reload(false);
    };

    useEffect(() => {
        getUser();

    }, [handleSignOut])

    const handleDeregister = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/users/deregister_user`, { email: signedInUser }, {
            headers: {
                'x-access-token': token
            }
        })
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
                <AddNewDoc token={token} />
                <button onClick={handleSignOut} id="sign-out-btn">Sign out</button>
                <button onClick={handleDeregister} id="deregister-btn" >Deregister</button>
            </div>
            <DocsTable token={token} />
        </div>
    );
}

export default User;
