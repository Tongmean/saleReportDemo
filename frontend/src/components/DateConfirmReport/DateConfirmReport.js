//DateConfirmReport

import { React, useState, useEffect } from 'react';
import { Button, message, Table, DatePicker } from 'antd';
import apiService from '../../services/apiService';
import './DateConfirmReport.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DateConfirmReport = () => {
    const [DateConfirmData, setDateConfirmData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countByServer, setCountByServer] = useState(0);
    const [countByClient, setCountByClient] = useState(0);
    const [dates, setDates] = useState([null, null]);

    useEffect(() => {
        console.log("Selected dates: ", dates);
    }, [dates]);

    const handlefetchDateConfirm = async () => {
        console.log("Fetching data with selected dates");
        setLoading(true);

        // Ensure we have valid date values before proceeding
        if (!dates[0] || !dates[1]) {
            message.error("กรุณาเลือกช่วงวันที่ก่อนดึงข้อมูล");
            setLoading(false);
            return;
        }

        // Format the selected dates for the API request
        const startDate = dates[0].format('YYYY-MM-DD');
        const endDate = dates[1].format('YYYY-MM-DD');

        console.log(`Request startDate: ${startDate}, endDate: ${endDate}`);

        try {
            const response = await apiService.fetchDateConfirm(startDate, endDate);
            if (response) {
                console.log("Data fetched successfully: ", response.data.data);
                const countlength = response.data.countlength || 0;
                const dataLength = response.data.data.length;

                console.log("countlength from server:", countlength);
                console.log("dataLength from response:", dataLength);

                if (countlength === dataLength) {
                    console.log("The number of records matches the countlength.");
                } else {
                    console.log("Warning: The number of records does not match the countlength!");
                }

                setDateConfirmData(response.data.data);
                setCountByServer(countlength);
                setCountByClient(dataLength);
            }
        } catch (error) {
            if (error.response && error.response.data.errorType === "database") {
                message.error("ฐานข้อมูลล้มเหลว โปรติดต่อผู้ดูแลระบบ [Database error]");
            } else if (error.response && error.response.data.errorType === "server-connection") {
                message.error("ระบบล้มเหลวโปรดติดต่อผู้ดูแลระบบ [Server error]");
            } else {
                message.error("ระบบล้มเหลว [undefined error]");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopyData = () => {
        if (DateConfirmData.length === 0) {
            message.warning("ไม่มีข้อมูลให้คัดลอก");
            return;
        }
    
        // Define headers matching the current table columns
        const headers = [
            'salesorderuserid',
            'st_confirmed',
            'entityuserid',
            'entity_firstname'
        ];

        // Helper function to format the value as text or number
        const formatValue = (column, value) => {
            const textColumns = ['salesorderuserid', 'entityuserid'];
            const numberColumns = [];

            if (textColumns.includes(column)) {
                return `"${value}"`; // Treat as text, surround with double quotes for text-lock in Excel
            }
            return value; // Default case
        };

        // Transform the DateConfirmData into TSV format with specific column formatting
        const tsvData = [
            headers.join('\t'), // Join headers with tabs
            ...DateConfirmData.map(row =>
                [
                    formatValue('salesorderuserid', row.salesorderuserid),
                    // formatValue('st_confirmed', row.st_confirmed),
                    moment.utc(row.st_confirmed).format('DD/MM/YYYY'),
                    formatValue('entityuserid', row.entityuserid),
                    formatValue('entity_firstname', row.entity_firstname)
                ].join('\t') // Join row values with tabs
            )
        ].join('\n'); // Join each row with newlines

        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            message.success("คัดลอกข้อมูลสำเร็จ! คุณสามารถวางใน Excel ด้วย Ctrl+V");
        }
        
        // Usage
        copyToClipboard(tsvData);
        
            // // Copy data to clipboard
            // navigator.clipboard.writeText(tsvData)
            //     .then(() => {
            //         message.success("คัดลอกข้อมูลสำเร็จ! คุณสามารถวางใน Excel ด้วย Ctrl+V");
            //     })
            //     .catch(err => {
            //         message.error("การคัดลอกข้อมูลล้มเหลว โปรดลองใหม่อีกครั้ง");
            //         console.error("Error copying data: ", err);
            //     });
    };

    const columns = [
        {
            title: 'salesorderuserid',
            dataIndex: 'salesorderuserid',
            key: 'salesorderuserid',
        },
        {
            title: 'st_confirmed',
            dataIndex: 'st_confirmed',
            key: 'st_confirmed',
            render: (text) => moment.utc(text).format('DD/MM/YYYY'),
        },
        {
            title: 'entityuserid',
            dataIndex: 'entityuserid',
            key: 'entityuserid',
        },
        {
            title: 'entity_firstname',
            dataIndex: 'entity_firstname',
            key: 'entity_firstname',
        }
    ];
    

    return (
        <div className='DateConfirm-report'>
            <h2 className='header-report'>Date ConFirm Report</h2>
            <div className='compare-length'>
                <span> จำนวนจาก database : {countByClient} </span>
                <span> จำนวนที่ได้รับ : {countByServer} </span>
            </div>
            <div className='datePicker'>
                <RangePicker 
                    format="MM-DD-YYYY" 
                    onChange={(values) => setDates(values || [null, null])} // Safely set dates or default to [null, null]
                />
                <p>วันที่สุดท้ายที่ใส่เข้าไป คือ วันที่สุดท้าย + 1 วัน <br></br> (เช่น เมื่อต้องการข้อมูลจากวันที่ 5/9/2024 ถึง 10/9/2024 เลือก start date = 5/9/2024 , end Date = 11/9/2024)</p>
            </div>
            <div className='button-part'>
                <Button
                    type="primary"
                    onClick={handlefetchDateConfirm}
                    disabled={!dates[0] || !dates[1]} // Disable if dates are not selected
                >
                    ดึงข้อมูล
                </Button>
                <Button
                    type="primary"
                    onClick={handleCopyData}
                    disabled={DateConfirmData.length === 0}
                >
                    Copy
                </Button>
            </div>
            
            <Table
                dataSource={DateConfirmData}
                columns={columns}
                size='small'
                loading={loading}
                pagination={{ pageSize: 100 }}
            />
        </div>
    );
};

export default DateConfirmReport;
