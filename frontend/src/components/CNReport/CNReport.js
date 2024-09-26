import { React, useState, useEffect } from 'react';
import { Button, message, Table, DatePicker } from 'antd';
import apiService from '../../services/apiService';
import './CNReport.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

const CNReport = () => {
    const [CNData, setCNData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countByServer, setCountByServer] = useState(0);
    const [countByClient, setCountByClient] = useState(0);
    const [dates, setDates] = useState([null, null]);

    useEffect(() => {
        console.log("Selected dates: ", dates);
    }, [dates]);

    const handleFetchCN = async () => {
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
            const response = await apiService.fetchCN(startDate, endDate);
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

                setCNData(response.data.data);
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
        if (CNData.length === 0) {
            message.warning("ไม่มีข้อมูลให้คัดลอก");
            return;
        }
    
        // Define headers matching the current table columns
        const headers = [
            'salescreditnoteid',
            'st_processed',
            'salescreditnoteuserid_processed',
            'sourcerefid_docuserid',
            'customerid',
            'refid',
            'personnelid_sales',
            'itemnumber',
            'sourcerefid',
            'sourcerefid_matunitid',
            'quantity',
            'unitsize',
            'agquantity',
            'unitprice',
            'amount',
            'amountwithtax',
            'st_processedcanceled'
        ];

        // Helper function to format the value as text or number
        const formatValue = (column, value) => {
            // Columns that should be locked as text (added single quotes around them for TSV format)
            const textColumns = ['salescreditnoteid', 'customerid', 'salescreditnoteuserid_processed', 'sourcerefid_docuserid', 'st_processed', 'st_processedcanceled'];

            // Columns that should be treated as numbers
            const numberColumns = ['quantity', 'unitsize', 'agquantity', 'unitprice', 'amount', 'amountwithtax'];

            if (textColumns.includes(column)) {
                return `"${value}"`; // Treat as text, surround with double quotes for text-lock in Excel
            } else if (numberColumns.includes(column)) {
                return Number(value); // Treat as number
            }
            return value; // Default case
        };

        // Transform the CNData into TSV format with specific column formatting
        const tsvData = [
            headers.join('\t'), // Join headers with tabs
            ...CNData.map(row => 
                [
                    formatValue('salescreditnoteid', row.salescreditnoteid),
                    // formatValue('st_processed', row.st_processed),
                    moment(row.st_processed).format('DD/MM/YYYY'),
                    formatValue('salescreditnoteuserid_processed', row.salescreditnoteuserid_processed),
                    formatValue('sourcerefid_docuserid', row.sourcerefid_docuserid),
                    formatValue('customerid', row.customerid),
                    formatValue('refid', row.refid),
                    formatValue('personnelid_sales', row.personnelid_sales),
                    formatValue('itemnumber', row.itemnumber),
                    formatValue('sourcerefid', row.sourcerefid),
                    formatValue('sourcerefid_matunitid', row.sourcerefid_matunitid),
                    formatValue('quantity', row.quantity),
                    formatValue('unitsize', row.unitsize),
                    formatValue('agquantity', row.agquantity),
                    formatValue('unitprice', row.unitprice),
                    formatValue('amount', row.amount),
                    formatValue('amountwithtax', row.amountwithtax),
                    formatValue('st_processedcanceled', row.st_processedcanceled)
                ].join('\t') // Join row values with tabs
            )
        ].join('\n'); // Join each row with newlines

        // Copy data to clipboard
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
            title: 'salescreditnoteid',
            dataIndex: 'salescreditnoteid',
            key: 'salescreditnoteid',
        },
        {
            title: 'st_processed',
            dataIndex: 'st_processed',
            key: 'st_processed',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'salescreditnoteuserid_processed',
            dataIndex: 'salescreditnoteuserid_processed',
            key: 'salescreditnoteuserid_processed',
        },
        {
            title: 'sourcerefid_docuserid',
            dataIndex: 'sourcerefid_docuserid',
            key: 'sourcerefid_docuserid',
        },
        {
            title: 'customerid',
            dataIndex: 'customerid',
            key: 'customerid',
        },
        {
            title: 'refid',
            dataIndex: 'refid',
            key: 'refid',
        },
        {
            title: 'personnelid_sales',
            dataIndex: 'personnelid_sales',
            key: 'personnelid_sales',
        },
        {
            title: 'itemnumber',
            dataIndex: 'itemnumber',
            key: 'itemnumber',
        },
        {
            title: 'sourcerefid',
            dataIndex: 'sourcerefid',
            key: 'sourcerefid',
        },
        {
            title: 'sourcerefid_matunitid',
            dataIndex: 'sourcerefid_matunitid',
            key: 'sourcerefid_matunitid',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'unitsize',
            dataIndex: 'unitsize',
            key: 'unitsize',
        },
        {
            title: 'agquantity',
            dataIndex: 'agquantity',
            key: 'agquantity',
        },
        {
            title: 'unitprice',
            dataIndex: 'unitprice',
            key: 'unitprice',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'amountwithtax',
            dataIndex: 'amountwithtax',
            key: 'amountwithtax',
        },
        {
            title: 'st_processedcanceled',
            dataIndex: 'st_processedcanceled',
            key: 'st_processedcanceled',
        },
    ];
    

    return (
        <div className='CN-report'>
            <h2 className='header-report'>Cradit Note Report</h2>
            <div className='compare-length'>
                <span> จำนวนจาก database : {countByClient} </span>
                <span> จำนวนที่ได้รับ : {countByServer} </span>
            </div>
            <div>
                <RangePicker 
                    format="MM-DD-YYYY" 
                    onChange={(values) => setDates(values || [null, null])} // Safely set dates or default to [null, null]
                />
            </div>
            <div className='button-part'>
                <Button
                    type="primary"
                    onClick={handleFetchCN}
                    disabled={!dates[0] || !dates[1]} // Disable if dates are not selected
                >
                    ดึงข้อมูล
                </Button>
                <Button
                    type="primary"
                    onClick={handleCopyData}
                    disabled={CNData.length === 0}
                >
                    Copy
                </Button>
                </div>
            
            <Table
                dataSource={CNData}
                columns={columns}
                size='small'
                loading={loading}
                pagination={{ pageSize: 100 }}
            />
        </div>
    );
};

export default CNReport;
