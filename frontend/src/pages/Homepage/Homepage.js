import { react, useState, useEffect } from 'react';
import { Button } from 'antd';
import apiService from '../../services/apiService';

const Home = () => {

    const handleFetchMAT = () => {
        console.log("active-handleFetchMAT")
        const res = apiService.fetchMAT();
    };

    return (
        <div>
            <h2>Home page</h2>
            <Button
                type="primary"
                onClick={handleFetchMAT}
            >
                fetch MAT report
            </Button>
        </div>
    );
};

export default Home;