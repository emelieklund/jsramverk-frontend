import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function Home() {
    // Temporary
    const [loggedIn, setLoggedIn] = useState(false);

    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Used when logged in
    const [token, setToken] = useState("");
    const [signedInUser, setSignedInUser] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // Get token
    const getToken = () => {
        fetch(`${AZURE}/posts/token`)
        .then(res => res.json())
        .then(json => (
            setToken(json.token),
            setSignedInUser(json.user)
        ))
        .catch((error) => console.log(error))
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        const login = await axios.post(`${AZURE}/auth/login`, {
            email: username,
            password: password
        })
        .catch(function (error) {
            if (error.response) {
                setMessage(error.response.data.message)
            }
        });

        if (login) {
            if (login.data.message === "User successfully logged in") {
                setMessage(login.data.message);
            }
        }
    }

    const handleSignOut = async () => {
        const signOut = await axios.post(`${AZURE}/auth/logout`);

        setMessage(signOut.data.message);
    }

    useEffect(() => {
        getToken();

    }, [handleSignIn, handleSignOut])

    if (token !== "") {
        return (
            <div className="home-div" >
                <h2>Welcome, {signedInUser}!</h2>
                <div className="new-doc-div" >
                    <AddNewDoc />
                    <button onClick={handleSignOut} id="sign-out-btn">Sign out</button>
                </div>
                <DocsTable />
            </div>
        );
    } else {
        return (
            <div className="home-div" >
                <Link to="users">
                    <button id="new-user-btn">Show all users</button>
                </Link>
                <div className="sign-in-div" >
                    <form onSubmit={handleSignIn} id="sign-in-form">
                        <p>Sign in</p>
                        <label htmlFor='username'></label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => {setUsername(e.target.value)}}
                                required
                            />
                        <label htmlFor='password'></label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                required
                            />
                        <input type="submit" value="Sign in" />
                    </form>
                    <Link to="create-user">
                        <button id="new-user-btn">Create a new user</button>
                    </Link>
                    <p className="message">{message}</p>
                </div>
            </div>
        );
    }
}

export default Home;
