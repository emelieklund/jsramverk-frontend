import React, { useState, useEffect } from 'react';

import '../style/Users.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//const AZURE="https://jsramverk-anja22-d3hwepg4gzbuejg2.northeurope-01.azurewebsites.net";
const AZURE="http://localhost:1337";

function Users() {
    const [users, setUsers] = useState([]);

    // Fetch data from backend
    const getUsers = () => {
        fetch(`${AZURE}/users`)
        .then(res => res.json())
        .then(json => setUsers(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="table-div" >
            <Table className="table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Username/Email</TableCell>
                        <TableCell>Password</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Users;
