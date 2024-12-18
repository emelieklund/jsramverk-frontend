import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/CreateUser.css';

const BASE_URL="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
//const BASE_URL="http://localhost:1337";

function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password === repeatedPassword) {
            await axios.post(`${BASE_URL}/users/register_user`, {
                email: username,
                password: password
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.data.message)
                }
            });
            setMessage("User created");
            setUsername("");
            setPassword("");
            setRepeatedPassword("");

            window.location.href = "https://www.student.bth.se/~emek22/editor";

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
