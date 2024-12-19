import React from 'react';
import axios from 'axios';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

import BASE_URL from './base_url.js';

function User() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // eslint-disable-next-line
    const handleSignOut = async (e) => {
        e.preventDefault();

        await axios.post(`${BASE_URL}/auth/logout`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload(false);
    };

    const handleDeregister = async (e) => {
        e.preventDefault();

        let answer = window.confirm(`Do you really want to delete the account of ${user}?`);

        if (answer) {
            await axios.post(`${BASE_URL}/users/deregister_user`, { email: user }, {
                headers: {
                    'x-access-token': token
                }
            })
            .then(localStorage.removeItem("token"), localStorage.removeItem("user"))
            .catch((error) => {
                console.log(error)
            });

            alert("User was successfully deregistered!");

            window.location.reload(false);
        }
    }

    return (
        <div className="home-div" >
            <h2>Welcome, {user}!</h2>
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
