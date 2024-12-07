import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import User from './User.js';
import '../style/Home.css';

//const BASE_URL="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const BASE_URL="http://localhost:1337";

function Home() {
    // Used for login form
    const [username, setUsername] = useState("test");
    const [password, setPassword] = useState("");

    // Used when logged in
    const [token, setToken] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // Get token
    const getToken = () => {
        fetch(`${BASE_URL}/posts/token`)
        .then(res => res.json())
        .then(json => (
            [setToken(json.token)]
        ))
        .catch((error) => console.log("Error: ", error))
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        const login = await axios.post(`${BASE_URL}/auth/login`, {
            email: username,
            password: password
        })
        .catch((error) => {
            if (error.response) {
                setMessage(error.response.data.message)
            }
        });

        if (login) {
            setMessage(login.data.message);
        }
    };

    useEffect(() => {
        getToken();

    }, [handleSignIn])

    if (token && token !== "") {
        return (
            <User token={token}/>
        );
    } else {
        return (
            <div className="home-div" >
                <div className="sign-in-div" >
                    <form onSubmit={handleSignIn} id="sign-in-form">
                        <p>Sign in</p>
                        <label htmlFor='username'></label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
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
