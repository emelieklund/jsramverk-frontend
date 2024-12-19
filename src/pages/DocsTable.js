import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import '../style/DocsTable.css';

import BASE_URL from './base_url.js';

function DocsTable() {
    const [documents, setDocuments] = useState([]);

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Fetch data from backend
    const getDocuments = () => {
        fetch(`${BASE_URL}/posts/get_documents`, {
            headers: {
                'x-access-token': token
            }
        })
        .then(res => res.json())
        .then(json => setDocuments(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getDocuments();

        // eslint-disable-next-line
    }, [])

    // Delete from backend
    const handleDelete = async (id, owner) => {
        if (owner !== user) {
            alert("You cannot delete this document since you are not the owner")
        } else {
            await axios.post(`${BASE_URL}/posts/delete/${id}`, {}, {
                headers: {
                    'x-access-token': token
                }
            });

            window.location.reload(false);
        }
    }

    return (
        <div className="table-div" >
            <Table className="table" >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Coworkers</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Last update</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((data, i) => (
                        <TableRow
                            key={i}
                            className="row"
                        >
                            <TableCell><FontAwesomeIcon icon={faFile} id="file-icon" /></TableCell>
                            <TableCell><Link to={`/doc/${data._id}`} >{data.title}</Link></TableCell>
                            <TableCell>{data.owner}</TableCell>
                            <TableCell>{data.allowed_users[0]}</TableCell>
                            <TableCell>{data.created}</TableCell>
                            <TableCell>{data.last_update}</TableCell>
                            <TableCell align="right"><FontAwesomeIcon icon={faTrashCan} id="trash-icon" onClick={() => handleDelete(data._id, data.owner)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DocsTable;
