import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router";

import '../style/CreateUser.css';

import BASE_URL from './base_url.js';

function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [message, setMessage] = useState("");

    let navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password === repeatedPassword) {
            try {
                const response = await axios.post(`${BASE_URL}/users/register_user`, {
                    email: username,
                    password: password
                });

                alert(response.data.message);
                navigate(-1);
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message)
                }
            }

        } else {
            setMessage("Passwords don't match");
        }
    }

    return (
        <div className="home-div" >
            <div className="create-user-div" >
                <form onSubmit={handleRegister}>
                    <p>Create a new user account</p>
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
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        />
                    <label htmlFor='repeat-password'></label>
                        <input
                            id="repeat-password"
                            type="password"
                            name="repeat-password"
                            placeholder="Repeat password"
                            value={repeatedPassword}
                            onChange={(e) => {setRepeatedPassword(e.target.value)}}
                            required
                        />
                    <input type="submit" value="Create user account" />
                </form>
                <p className="message">{message}</p>
            </div>
        </div>
    );
}

export default CreateUser;
