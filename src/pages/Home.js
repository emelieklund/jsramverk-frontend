import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
//const AZURE="http://localhost:1337";

function Home() {
    // Temporary
    const [loggedIn, setLoggedIn] = useState(false);

    const [token, setToken] = useState("");

    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Used when logged in
    const [signedInUser, setSignedInUser] = useState("");

    const [message, setMessage] = useState("");

    // Get token
    const getToken = () => {
        fetch(`${AZURE}/auth/token`)
        .then(res => res.json())
        .then(json => setToken(json))
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
            //console.log(login.data.user.email)
            if (login.data.message === "User successfully logged in") {
                setLoggedIn(true);
                setMessage(login.data.message);
                //setSignedInUser(login.data.user.email)
                document.cookie = `user=${login.data.user.email}; expires=Fri, 1 Nov 2024 23:59:59 GMT; path=/`;
                //userCookie = document.cookie.split("; ").find((row) => row.startsWith("user"));
                //setSignedInUser(document.cookie.split("; ").find((row) => row.startsWith("user")));
            }
        }
    }

    const handleSignOut = async () => {
        await axios.post(`${AZURE}/auth/logout`);
        setMessage("You've been logged out");
    }

    useEffect(() => {
        getToken();
    }, [handleSignIn, handleSignOut])

    if (token !== "") {
        return (
            <div className="home-div" >
                <h2>Welcome, {(document.cookie.split("; ").find((row) => row.startsWith("user"))).substring(5)}!</h2>
                <p>{token}</p>
                <button onClick={handleSignOut}>Sign out</button>
                <AddNewDoc />
                <DocsTable />
            </div>
        );
    } else {
        return (
            <div className="home-div" >
                <Link to="users">Show all users</Link>
                <p>{token}</p>
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

    // return (
    //     <div className="home-div" >
    //         <SignIn />
    //         <AddNewDoc />
    //         <DocsTable />
    //     </div>
    // );
}

export default Home;
