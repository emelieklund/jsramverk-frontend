import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFloppyDisk, faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import CodeEditor from './CodeEditor.js';
import '../style/Doc.css';

const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
//const AZURE="http://localhost:1337";

function Doc() {
    // Get id from parameter
    const params = useParams();
    const documentID = params.id;

    const [doc, setDocument] = useState([]);

    // Title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Code mode
    const [codeMode, setCodeMode] = useState(false);

    // Share document with collaborator
    const [collaborator, setCollaborator] = useState("");

    // Fetch data from backend
    const getDocument = () => {
        fetch(`${AZURE}/posts/${documentID}`)
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
        setTitle(doc.title);
        setContent(doc.content);
    }, [doc])

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(AZURE);

        socket.current.emit("join_room", documentID);

        socket.current.on("content", (data) => {
            setContent(data.content);
        });

        return () => {
            socket.current.disconnect();
        }

        // eslint-disable-next-line
    }, []);

    // Submit updated data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts/update`, {
            _id: documentID,
            title: title,
            content: content
        });

        window.location.reload(false);
    }

    // Share document with other user
    const handleShare = async (e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts/update_collaborator`, {
            _id: documentID,
            email: collaborator
        });

        window.location.reload(false);
    }

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts/delete/${id}`);

        window.location.href = "/#";
    }

    const handleContentChange = (e) => {
        const value = e.target.value;

        let data = {
            _id: documentID,
            title: title,
            content: value
        };

        socket.current.emit("content", data);
    }

    const handleEditorMode = (e) => {
        if (codeMode === false) {
            setCodeMode(true);
        } else {
            setCodeMode(false);
        }

        // save to database
    }

    const shareForm = (
        <form onSubmit={handleShare}>
            <p>Share document</p>
            <input
                id="collaborator"
                type="text"
                name="collaborator"
                placeholder="Add collaborator"
                onChange={(e) => {setCollaborator(e.target.value)}}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    )

    const titleDiv = (
        <label htmlFor="title-input">
            <input
                data-testid="title-input"
                id="title-input"
                type="text"
                name="title"
                defaultValue={title}
                onChange={(e) => {setTitle(e.target.value)}}
            />
        </label>
    )

    const icons = (
        <div id="icons-div">
            <div className="icon-div" onClick={(e) => handleEditorMode(e)} >
                <FontAwesomeIcon icon={faCode} className="icon"/>
                <p>Code mode</p>
            </div>
            <div className="icon-div" onClick={(e) => handleShare(e)} >
                <FontAwesomeIcon icon={faUserPlus} className="icon"/>
                <p>Share</p>
            </div>
            <div className="icon-div" onClick={(e) => handleSubmit(e)} >
                <FontAwesomeIcon icon={faFloppyDisk} className="icon"/>
                <p>Save</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={(e) => handleDelete(documentID, e)} data-testid="delete-button" />
                <p>Delete</p>
            </div>
        </div>
    )

    const textArea = (
        <textarea
            id="content-input"
            name="content"
            value={content}
            onChange={handleContentChange}
            autoFocus
            spellCheck="true"
            //onChange={(e) => {setContent(e.target.value)}}
        />
    )

    if (codeMode === false) {
        return (
            <div className="doc-div" >
                <div className="upper-div" >
                    {titleDiv}
                    {icons}
                </div>
                {textArea}
            </div>
        )
    } else {
        return (
            <div className="doc-div" >
                <div className="upper-div" >
                    {titleDiv}
                    {icons}
                </div>
                <CodeEditor />
            </div>
        )
    }
}

export default Doc;
