import { react, useState, useEffect } from 'react';
import { Button, message, Table } from 'antd';
import apiService from '../../services/apiService';
import './MATReport.css'

const MATReport = () => {
    const [MATData, setMATData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchMAT = async () => {
        console.log("active-handleFetchMAT");
        setLoading(true);

        try {
            const response = await apiService.fetchMAT();
            if (response) {
                console.log("fetchMAT complete: ", response.data.data);
                const { countlength } = response.data.data || 0 ;
                console.log("countlength server:", countlength)
                setMATData(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.data.errorType === "database") {
                message.error("ฐานข้อมูลล้มเหลว โปรติดต่อผู้ดูแลระบบ [Database error]");
            } else if (error.response && error.response.data.errorType === "server-connection") {
                message.error("ระบบล้มเหลวโปรดติดต่อผู้ดูแลระบบ [Server error]");
            } else {
                message.error("ระบบล้มเหลวเหลว [undefine error]");
            }
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'matid',
            dataIndex: 'matid',
            key: 'matid',
        },
        {
            title: 'matcategoryid',
            dataIndex: 'matcategoryid',
            key: 'matcategoryid',
        },
        {
            title: 'mat',
            dataIndex: 'mat',
            key: 'mat',
        },
        {
            title: 'matunitid',
            dataIndex: 'matunitid',
            key: 'matunitid',
        },
        {
            title: 'matunitrefid',
            dataIndex: 'matunitrefid',
            key: 'matunitrefid',
        },
        {
            title: 'matunituserid',
            dataIndex: 'matunituserid',
            key: 'matunituserid',
        },
    ];

    return (
        <div className='MAT-report'>
            <h2>MATReport comp</h2>
            <Button
                type="primary"
                onClick={handleFetchMAT}
            >
                fetch MAT report
            </Button>
            <Table
                dataSource={MATData}
                columns={columns}
                size='middle'
                loading={loading}
                rowKey="matid"
                // pagination={false}
            />
        </div>
    );
};

export default MATReport;
