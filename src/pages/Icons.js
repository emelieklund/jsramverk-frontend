import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faFloppyDisk, faTrashCan, faCommentDots } from "@fortawesome/free-solid-svg-icons";

import '../style/Icons.css';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function Icons({documentID, title, content}) {
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

    const handleComment = (e) => {
        const text = document.getElementById("content-input").value;
        const rowArray = text.split(".");
        console.log(rowArray[1]);
        
    }

    const removeAlignClasses = () => {
        const text = document.getElementById("content-input");
        const alignArray = ["align-left", "align-right", "align-center", "align-justify"];
        alignArray.forEach(element => {
            text.classList.remove(element);
        });
    }

    const handleLeft = () => {
        const text = document.getElementById("content-input");
        removeAlignClasses();
        text.classList.add("align-left");
    }

    const handleRight = () => {
        const text = document.getElementById("content-input");
        removeAlignClasses();
        text.classList.add("align-right");
    }

    const handleJustify = () => {
        const text = document.getElementById("content-input");
        removeAlignClasses();
        text.classList.add("align-justify");
    }

    const handleCenter = () => {
        const text = document.getElementById("content-input");
        removeAlignClasses();
        text.classList.add("align-center");
    }

    return (
        <div id="icons-div" >
            <div className="icon-div" >
                <FontAwesomeIcon icon={faAlignLeft} className="icon" onClick={(e) => handleLeft()} />
                <p>Left</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faAlignRight} className="icon" onClick={(e) => handleRight()} />
                <p>Right</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faAlignCenter} className="icon" onClick={(e) => handleCenter()} />
                <p>Center</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faAlignJustify} className="icon" onClick={(e) => handleJustify()} />
                <p>Justify</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faCommentDots} className="icon" id="comment" onClick={(e) => handleComment(e)}/>
                <p>Comment</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faFloppyDisk} className="icon" onClick={(e) => handleSubmit(e)}/>
                <p>Save</p>
            </div>
            <div className="icon-div" >
                <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={(e) => handleDelete(documentID, e)} data-testid="delete-button" />
                <p>Delete</p>
            </div>
        </div>
    );
}

export default Icons;
