import { react, useState, useEffect } from 'react';
import { Button, message, Table } from 'antd';
import apiService from '../../services/apiService';
import './MATReport.css';

const MATReport = () => {
    const [MATData, setMATData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countByServer, setCountByServer] = useState(0);
    const [countByClient, setCountByClient] = useState(0);

    const handleFetchMAT = async () => {
        console.log("active-handleFetchMAT");
        setLoading(true);

        try {
            const response = await apiService.fetchMAT();
            if (response) {
                console.log("fetchMAT complete: ", response.data.data);
                const countlength = response.data.countlength || 0;
                const dataLength = response.data.data.length;

                console.log("countlength from server:", countlength);
                console.log("dataLength from response:", dataLength);

                // ตรวจสอบว่าจำนวน record ตรงกันหรือไม่
                if (countlength === dataLength) {
                    console.log("The number of records matches the countlength.");
                } else {
                    console.log("Warning: The number of records does not match the countlength!");
                }

                setMATData(response.data.data);
                setCountByServer(countlength);
                setCountByClient(dataLength);
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

    const handleCopyData = () => {
        if (MATData.length === 0) {
            message.warning("ไม่มีข้อมูลให้คัดลอก");
            return;
        }

        // แปลงข้อมูลในตารางเป็นรูปแบบ TSV (Tab-separated values)
        const headers = ['matid', 'matcategoryid', 'mat', 'matunitid', 'matunitrefid', 'matunituserid'];
        const tsvData = [
            headers.join('\t'), // หัวตาราง
            ...MATData.map(row => 
                `${row.matid}\t${row.matcategoryid}\t${row.mat}\t${row.matunitid}\t${row.matunitrefid}\t${row.matunituserid}`
            )
        ].join('\n'); // แต่ละ record แยกด้วย '\n' และคอลัมน์แยกด้วย '\t'

        // คัดลอกข้อมูลไปยัง clipboard
        navigator.clipboard.writeText(tsvData)
            .then(() => {
                message.success("คัดลอกข้อมูลสำเร็จ! คุณสามารถวางใน Excel ด้วย Ctrl+V");
            })
            .catch(err => {
                message.error("การคัดลอกข้อมูลล้มเหลว โปรดลองใหม่อีกครั้ง");
                console.error("Error copying data: ", err);
            });
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
            <div>
                <span> จำนวนจาก database : {countByClient} </span>
                <span> จำนวนที่ได้รับ : {countByServer} </span>
            </div>
            <Button
                type="primary"
                onClick={handleFetchMAT}
            >
                fetch MAT report
            </Button>
            <Button
                type="primary"
                onClick={handleCopyData}
                disabled={MATData.length === 0}
            >
                Copy Data
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
