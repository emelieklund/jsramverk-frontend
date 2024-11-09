import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileLines, faFloppyDisk, faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import CodeEditor from './CodeEditor.js';
import ShareDoc from './ShareDoc.js';
import '../style/Doc.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function Doc() {
    // Get id from parameter
    const params = useParams();
    const documentID = params.id;
    const token = params.token;

    const [doc, setDocument] = useState([]);

    // Title and content, used when updating document
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Shows share doc form when set to true
    const [showShareForm, setShowShareForm] = useState(false);

    // Code mode
    const [codeMode, setCodeMode] = useState(false);

    // Fetch data from backend
    const getDocument = () => {
        fetch(`${AZURE}/posts/${documentID}`, {
            headers: {
                'x-access-token': token
            }
        })
        .then(res => res.json())
        .then(json => setDocument(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDocument();

        // eslint-disable-next-line
    }, []);

    // Update title, content and code mode when "doc" is changed
    useEffect(() => {
        setTitle(doc.title);
        setContent(doc.content);
        setCodeMode(doc.code_mode);

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
        }, {
            headers: {
                'x-access-token': token
            }
        });

        window.location.reload(false);
    }

    // Delete from backend
    const handleDelete = async (id, e) => {
        e.preventDefault();

        await axios.post(`${AZURE}/posts/delete/${id}`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        window.location.href = "/#";
    }

    // Handle content when changed
    const handleContentChange = (e) => {
        const value = e.target.value;

        let data = {
            _id: documentID,
            title: title,
            content: value
        };

        socket.current.emit("content", data);
    }

    // Shows/hides share doc form
    const handleShowForm = (e) => {
        if (showShareForm === false) {
            setShowShareForm(true);
        } else {
            setShowShareForm(false);
        }
    }

    const handleCodeMode = async (e) => {
        if (codeMode === false) {
            await axios.post(`${AZURE}/posts/activate_code/${documentID}`, {}, {
                headers: {
                    'x-access-token': token
                }
            });
            setCodeMode(true);
        } else {
            await axios.post(`${AZURE}/posts/deactivate_code/${documentID}`, {}, {
                headers: {
                    'x-access-token': token
                }
            });
            setCodeMode(false);
        }
    }

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

    let codeModeIcon;

    if (codeMode === false) {
        codeModeIcon = (
            <div className="icon-div" onClick={(e) => handleCodeMode(e)} >
                <FontAwesomeIcon icon={faCode} className="icon"/>
                <p>Code mode</p>
            </div>
        )
    } else {
        codeModeIcon = (
            <div className="icon-div" onClick={(e) => handleCodeMode(e)} >
                <FontAwesomeIcon icon={faFileLines} className="icon"/>
                <p>Text mode</p>
            </div>
        )
    }

    const icons = (
        <div id="icons-div">
            {codeModeIcon}
            <div className="icon-div" onClick={(e) => handleShowForm(e)}>
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
        />
    )

    if (codeMode === false) {
        return (
            <div className="doc-div" >
                <div className="upper-div" >
                    {titleDiv}
                    {icons}
                </div>
                { showShareForm && (<ShareDoc token={token} />) }
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
