import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import User from './User.js';
import '../style/Home.css';

import BASE_URL from './base_url.js';

function Home() {
    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // eslint-disable-next-line
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email: username,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", username);
            setMessage(response.data.message);

            //window.location.reload(false);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message)
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    if (localStorage.getItem("token")) {
        return (
            <User />
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
