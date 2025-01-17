import React from 'react';
import './NavBar.css';

const NavBar = ({ onSectionChange, selectedSection }) => {
    return (
        <div className="navbar">
            <div
                className={`nav-item ${selectedSection === 'SaleOrder' ? 'active' : ''}`}
                onClick={() => onSectionChange('SaleOrder')}
            >
                Sale Order
            </div>
            <div
                className={`nav-item ${selectedSection === 'SetEnd' ? 'active' : ''}`}
                onClick={() => onSectionChange('SetEnd')}
            >
                Set End
            </div>
            <div
                className={`nav-item ${selectedSection === 'CN' ? 'active' : ''}`}
                onClick={() => onSectionChange('CN')}
            >
                CN
            </div>
            <div
                className={`nav-item ${selectedSection === 'MAT' ? 'active' : ''}`}
                onClick={() => onSectionChange('MAT')}
            >
                MAT
            </div>
            <div
                className={`nav-item ${selectedSection === 'DateConfirm' ? 'active' : ''}`}
                onClick={() => onSectionChange('DateConfirm')}
            >
                Date Confirm
            </div>
        </div>
    );
};

export default NavBar;
