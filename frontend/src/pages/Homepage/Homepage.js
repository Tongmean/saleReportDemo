import { react, useState, useEffect } from 'react';
import { Button } from 'antd';

const Home = () => {
    return (
        <div>
            <h2>Home page</h2>
            <Button
                type="primary"
            >
                fetch MAT report
            </Button>
        </div>
    );
};

export default Home;