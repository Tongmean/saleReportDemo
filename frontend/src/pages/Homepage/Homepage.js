import { react, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import apiService from '../../services/apiService';
import MATReport from '../../components/MATReport/MATReport';
import './Homepage.css'

const Home = () => {
    return (
        <div className='home-page'>
            <h2>Home page</h2>
            <MATReport/>
        </div>
    );
};

export default Home;
