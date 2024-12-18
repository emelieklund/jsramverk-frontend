import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import '../style/Users.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BASE_URL="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
//const BASE_URL="http://localhost:1337";

function Users() {
    const [users, setUsers] = useState([]);

    // Fetch data from backend
    const getUsers = () => {
        fetch(`${BASE_URL}/users`)
        .then(res => res.json())
        .then(json => setUsers(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUsers();
    }, [])

    // Delete from backend
    const handleDelete = async (email) => {
        await axios.post(`${BASE_URL}/users/delete/${email}`);

        //window.location.reload(false);
    }


    return (
        <div className="home-div" >
            <div className="table-div" >
                <Table className="table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Username/Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((data, i) => (
                            <TableRow
                                key={i}
                                className="row"
                            >
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.password}</TableCell>
                                <TableCell>{data.account_created}</TableCell>
                                <TableCell align="right"><FontAwesomeIcon icon={faTrashCan} id="trash-icon" onClick={() => handleDelete(data.email)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Users;
