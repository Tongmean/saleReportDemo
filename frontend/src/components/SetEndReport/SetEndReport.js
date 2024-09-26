import { React, useState, useEffect } from 'react';
import { Button, message, Table, DatePicker } from 'antd';
import apiService from '../../services/apiService';
import './SetEndReport.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

const SetEndReport = () => {
    const [setEndData, setSetEndData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countByServer, setCountByServer] = useState(0);
    const [countByClient, setCountByClient] = useState(0);
    const [dates, setDates] = useState([null, null]);

    useEffect(() => {
        console.log("Selected dates: ", dates);
    }, [dates]);

    const handleFetchSetEnd = async () => {
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
            const response = await apiService.fetchSetEnd(startDate, endDate);
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

                setSetEndData(response.data.data);
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
        if (setEndData.length === 0) {
            message.warning("ไม่มีข้อมูลให้คัดลอก");
            return;
        }
    
        // Define headers matching the current table columns
        const headers = [
            'datedoc',
            'salesorderuserid',
            'sourceid',
            'customerid',
            'personnelid_sales',
            'itemnumber',
            'matunitid',
            'quantity',
            'unitsize',
            'agquantity',
            'unitprice',
            'unitdiscount',
            'discount',
            'netamount',
            'quantityended',
            'st_ended'
        ];

        // Helper function to format the value as text or number
        const formatValue = (column, value) => {
            // Columns that should be locked as text (added single quotes around them for TSV format)
            const textColumns = ['customerid', 'matunitid', 'personnelid_sales', 'quantityended', 'salesorderuserid', 'sourceid', 'st_ended'];
            
            // Columns that should be treated as numbers
            const numberColumns = ['agquantity', 'discount', 'itemnumber', 'netamount', 'quantity', 'unitdiscount', 'unitprice', 'unitsize'];
            
            if (textColumns.includes(column)) {
                return `"${value}"`; // Treat as text, surround with double quotes for text-lock in Excel
            } else if (numberColumns.includes(column)) {
                return Number(value); // Treat as number
            }
            return value; // Default case
        };

        // Transform the setEndData into TSV format with specific column formatting
        const tsvData = [
            headers.join('\t'), // Join headers with tabs
            ...setEndData.map(row => 
                [
                    moment(row.datedoc).format('DD/MM/YYYY'), // 'datedoc'
                    formatValue('salesorderuserid', row.salesorderuserid), // 'salesorderuserid'
                    formatValue('sourceid', row.sourceid), // 'sourceid'
                    formatValue('customerid', row.customerid), // 'customerid'
                    formatValue('personnelid_sales', row.personnelid_sales), // 'personnelid_sales'
                    formatValue('itemnumber', row.itemnumber), // 'itemnumber'
                    formatValue('matunitid', row.matunitid), // 'matunitid'
                    formatValue('quantity', row.quantity), // 'quantity'
                    formatValue('unitsize', row.unitsize), // 'unitsize'
                    formatValue('agquantity', row.agquantity), // 'agquantity'
                    formatValue('unitprice', row.unitprice), // 'unitprice'
                    formatValue('unitdiscount', row.unitdiscount), // 'unitdiscount'
                    formatValue('discount', row.discount), // 'discount'
                    formatValue('netamount', row.netamount), // 'netamount'
                    formatValue('quantityended', row.quantityended), // 'quantityended'
                    formatValue('st_ended', row.st_ended) // 'st_ended'
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
            title: 'datedoc',
            dataIndex: 'datedoc',
            key: 'datedoc',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'salesorderuserid',
            dataIndex: 'salesorderuserid',
            key: 'salesorderuserid',
        },
        {
            title: 'sourceid',
            dataIndex: 'sourceid',
            key: 'sourceid',
        },
        {
            title: 'customerid',
            dataIndex: 'customerid',
            key: 'customerid',
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
            title: 'matunitid',
            dataIndex: 'matunitid',
            key: 'matunitid',
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
            title: 'unitdiscount',
            dataIndex: 'unitdiscount',
            key: 'unitdiscount',
        },
        {
            title: 'discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'netamount',
            dataIndex: 'netamount',
            key: 'netamount',
        },
        {
            title: 'quantityended',
            dataIndex: 'quantityended',
            key: 'quantityended',
        },
        {
            title: 'st_ended',
            dataIndex: 'st_ended',
            key: 'st_ended',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
    ];
    

    return (
        <div className='SetEnd-report'>
            <h2 className='header-report'>Set End Report</h2>
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
                    onClick={handleFetchSetEnd}
                    disabled={!dates[0] || !dates[1]} // Disable if dates are not selected
                >
                    ดึงข้อมูล
                </Button>
                <Button
                    type="primary"
                    onClick={handleCopyData}
                    disabled={setEndData.length === 0}
                >
                    Copy
                </Button>
            </div>
            
            <Table
                dataSource={setEndData}
                columns={columns}
                size='small'
                loading={loading}
                pagination={{ pageSize: 100 }}
            />
        </div>
    );
};

export default SetEndReport;
