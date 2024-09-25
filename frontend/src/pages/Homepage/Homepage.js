
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';

import MATReport from '../../components/MATReport/MATReport';
import SaleOrderReport from '../../components/SaleOrderReport/SaleOrderReport';
import SetEndReport from '../../components/SetEndReport/SetEndReport';
import CNReport from '../../components/CNReport/CNReport';
import DateConfirmReport from '../../components/DateConfirmReport/DateConfirmReport';
import './Homepage.css';

const Home = () => {
    const [section, setSection] = useState('CN'); // เริ่มต้นที่ 'CN'

    const renderSection = () => {
        switch (section) {
            case 'SaleOrder':
                return <SaleOrderReport/>;
            case 'SetEnt':
                return <SetEndReport/>;
            case 'CN':
                return <CNReport/>;
            case 'MAT':
                return <MATReport />;
            case 'DateConfirm':
                return <DateConfirmReport/>;
            default:
                return <SaleOrderReport/>;
        }
    };

    return (
        <div className='home-page'>
            <NavBar onSectionChange={setSection} />
            <div className='content'>
                {renderSection()}
            </div>
        </div>
    );
};

export default Home;
