import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import '../style/Doc.css';
import { io } from "socket.io-client";

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function Doc() {
    // Get id from parameter
    const params = useParams();
    const documentID = params.id;

    const [document, setDocument] = useState([]);

    // Title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Fetch data from backend
    const getDocument = () => {
        fetch(`${AZURE}/${documentID}`)
        .then(res => res.json())
        .then(json => setDocument(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDocument();

        // eslint-disable-next-line
    }, []);

    // Update title and content when "document" is changed
    useEffect(() => {
        setTitle(document.title);
        setContent(document.content);
    }, [document])

    // const joinRoom = () => {
    //     if (room !== "") {
    //         socket.emit("join_room", room);
    //     }
    // };

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(AZURE);

        socket.current.on("content", (data) => {
            setContent(data);
        });

        return () => {
            socket.current.disconnect();
        }
    }, [socket]);

    // Submit updated data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/update`, {
            _id: documentID,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/delete/${id}`);

        window.location.href = "/#";
    }

    const handleContentChange = (e) => {
        const value = e.target.value;

        socket.current.emit("content", value);
    }

    return (
        <div className="doc-div" >
            <div className="upper-div" >
                <input
                    data-testid="title-input"
                    id="title-input"
                    type="text"
                    name="title"
                    defaultValue={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <div id="icon-div" >
                    <FontAwesomeIcon icon={faFloppyDisk} className="icon" onClick={(e) => handleSubmit(e)}/>
                    <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={(e) => handleDelete(documentID, e)} data-testid="delete-button" />
                </div>
            </div>

            <label htmlFor="content-input"></label>
            <textarea
                id="content-input"
                name="content"
                value={content}
                onChange={handleContentChange}
                //onChange={(e) => {setContent(e.target.value)}}
            />
        </div>
    );
    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="title-input">Title:</label>
    //         <input
    //             data-testid="title-input"
    //             id="title-input"
    //             type="text"
    //             name="title"
    //             defaultValue={title}
    //             onChange={(e) => {setTitle(e.target.value)}}
    //         />

    //         <label htmlFor="content-input">Content:</label>
    //         <textarea
    //             id="content-input"
    //             name="content"
    //             value={content}
    //             onChange={handleContentChange}
    //             //onChange={(e) => {setContent(e.target.value)}}
    //         />
    //         <input type="submit" value="Update" />
    //         <button onClick={(e) => handleDelete(documentID, e)} className="deleteButton" data-testid="delete-button" >Delete</button>
    //     </form>
    // );
}

export default Doc;
