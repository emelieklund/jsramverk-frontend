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
        const textArea = document.getElementById("content-input").value;
        const rowArray = textArea.split(".");
        console.log(rowArray[1]);
    }

    // Align textarea
    const removeAlignClasses = () => {
        const textArea = document.getElementById("content-input");
        const alignArray = ["align-left", "align-right", "align-center", "align-justify"];
        alignArray.forEach(element => {
            textArea.classList.remove(element);
        });
    }

    const handleAlign = (align) => {
        removeAlignClasses();
        const textArea = document.getElementById("content-input");
        textArea.classList.add(align);
    }

    return (
        <div id="icons-div">
            <div className="icon-div" onClick={() => handleAlign("align-left")} >
                <FontAwesomeIcon icon={faAlignLeft} className="icon" />
                <p>Left</p>
            </div>
            <div className="icon-div" onClick={() => handleAlign("align-right")} >
                <FontAwesomeIcon icon={faAlignRight} className="icon" />
                <p>Right</p>
            </div>
            <div className="icon-div" onClick={() => handleAlign("align-center")} >
                <FontAwesomeIcon icon={faAlignCenter} className="icon"/>
                <p>Center</p>
            </div>
            <div className="icon-div" onClick={(e) => handleAlign("align-justify")} >
                <FontAwesomeIcon icon={faAlignJustify} className="icon" />
                <p>Justify</p>
            </div>
            <div className="icon-div" onClick={(e) => handleComment(e)} >
                <FontAwesomeIcon icon={faCommentDots} className="icon" id="comment" />
                <p>Comment</p>
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
    );
}

export default Icons;
