
import React from 'react';
import { Button } from 'antd';
import './NavBar.css';

const NavBar = ({ onSectionChange }) => {
    return (
        <div className="navbar">
            <Button onClick={() => onSectionChange('SaleOrder')}>Sale Order</Button>
            <Button onClick={() => onSectionChange('SetEnt')}>Set Ent</Button>
            <Button onClick={() => onSectionChange('CN')}>CN</Button>
            <Button onClick={() => onSectionChange('MAT')}>MAT</Button>
            <Button onClick={() => onSectionChange('DateConfrim')}>DateConfrim</Button>
        </div>
    );
};

export default NavBar;
