import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Icons from './Icons.js';
import '../style/Doc.css';
import { io } from "socket.io-client";
import CodeEditor from './CodeEditor.js';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

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
        setTitle(doc.title);
        setContent(doc.content);
    }, [doc])

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

    const handleContentChange = (e) => {
        const value = e.target.value;

        socket.current.emit("content", value);
    }

    const handleEditorMode = (e) => {
        if (codeMode === false) {
            setCodeMode(true);
        } else {
            setCodeMode(false);
        }

        // save to database
    }

    if (codeMode === false) {
        return (
            <div className="doc-div" >
                <button onClick={handleEditorMode} className="btn" >Switch to code mode</button>
                <div className="upper-div" >
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
                    <Icons codeMode={false} documentID={documentID} title={title} content={content} />
                </div>
                <label htmlFor="content-input"></label>
                <textarea
                    id="content-input"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    autoFocus
                    spellCheck="true"
                    //onChange={(e) => {setContent(e.target.value)}}
                ></textarea>
            </div>
        )
    } else {
        return (
            <>
                <button onClick={handleEditorMode} className="btn text-btn" >Switch to text mode</button>
                <div className="upper-div" >
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
                </div>
                <CodeEditor />
            </>
        )
    }
}

export default Doc;
