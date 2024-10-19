import React from 'react';

import AddNewDoc from './AddNewDoc.js';
import DocsTable from './DocsTable.js';
import '../style/Home.css';

function Home() {
    return (
        <div className="home-div" >
            <AddNewDoc />
            <DocsTable />
        </div>
    );
}

export default Home;
