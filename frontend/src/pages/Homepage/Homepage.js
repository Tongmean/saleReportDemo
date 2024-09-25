
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import MATReport from '../../components/MATReport/MATReport';
import './Homepage.css';

const Home = () => {
    const [section, setSection] = useState('CN'); // เริ่มต้นที่ 'CN'

    const renderSection = () => {
        switch (section) {
            case 'SaleOrder':
                return <h2>Sale Order Report</h2>;
            case 'SetEnt':
                return <h2>Set Ent Report</h2>;
            case 'CN':
                return <h2>CN Report</h2>;
            case 'MAT':
                return <MATReport />;
            case 'DateConfrim':
                return <h2>DateConfrim Report</h2>;
            default:
                return <h2>null value</h2>;
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
