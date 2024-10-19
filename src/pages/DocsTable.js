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

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net/posts";
const AZURE="http://localhost:1337";

function DocsTable() {
    const [documents, setDocuments] = useState([]);

    // Fetch data from backend
    const getDocuments = () => {
        fetch(AZURE)
        .then(res => res.json())
        .then(json => setDocuments(json))
    }

    useEffect(() => {
        getDocuments();
    }, [])

    // Delete from backend
    const handleDelete = async (id) => {
        await axios.post(`${AZURE}/delete/${id}`);

        window.location.reload(false);
    }

    return (
        <div className="table-div" >
            <Table className="table" >
                <TableHead>
                    <TableCell></TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Coworkers</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell></TableCell>
                </TableHead>
                <TableBody>
                    {documents.map((data, i) => (
                        <TableRow
                            key={i}
                            className="row"
                        >
                            <TableCell><FontAwesomeIcon icon={faFile} id="file-icon" /></TableCell>
                            <TableCell><Link to={`/doc/${data._id}`} >{data.title}</Link></TableCell>
                            <TableCell>---</TableCell>
                            <TableCell>---</TableCell>
                            <TableCell>---</TableCell>
                            <TableCell align="right"><FontAwesomeIcon icon={faTrashCan} id="trash-icon" onClick={() => handleDelete(data._id)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DocsTable;
