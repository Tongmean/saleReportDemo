import { React, useState, useEffect } from 'react';
import { Button, message, Table, DatePicker } from 'antd';
import apiService from '../../services/apiService';
import './SaleOrderReport.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

const SaleOrderReport = () => {
    const [SaleOrderData, setSaleOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countByServer, setCountByServer] = useState(0);
    const [countByClient, setCountByClient] = useState(0);
    const [dates, setDates] = useState([null, null]);

    useEffect(() => {
        console.log("Selected dates: ", dates);
    }, [dates]);

    const handleFetchSaleOrder = async () => {
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
            const response = await apiService.fetchSaleOrder(startDate, endDate);
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

                setSaleOrderData(response.data.data);
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
        if (SaleOrderData.length === 0) {
            message.warning("ไม่มีข้อมูลให้คัดลอก");
            return;
        }
    
        // Define headers matching the current table columns
        const headers = [
            'agquantity', 
            'customerid', 
            'datedoc', 
            'discount', 
            'itemnumber', 
            'matunitid', 
            'netamount', 
            'personnelid_sales', 
            'quantity', 
            'quantityended', 
            'salesorderuserid', 
            'sourceid', 
            'st_ended', 
            'unitdiscount', 
            'unitprice', 
            'unitsize'
        ];
    
        // Transform the SaleOrderData into TSV format
        const tsvData = [
            headers.join('\t'), // Join headers with tabs
            ...SaleOrderData.map(row => 
                `${row.agquantity}\t
                ${row.customerid}\t
                ${row.datedoc}\t
                ${row.discount}\t
                ${row.itemnumber}\t
                ${row.matunitid}\t
                ${row.netamount}\t
                ${row.personnelid_sales}\t
                ${row.quantity}\t
                ${row.quantityended}\t
                ${row.salesorderuserid}\t
                ${row.sourceid}\t
                ${row.st_ended}\t
                ${row.unitdiscount}\t
                ${row.unitprice}\t
                ${row.unitsize}`
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
            title: 'agquantity',
            dataIndex: 'agquantity',
            key: 'agquantity',
        },
        {
            title: 'customerid',
            dataIndex: 'customerid',
            key: 'customerid',
        },
        {
            title: 'datedoc',
            dataIndex: 'datedoc',
            key: 'datedoc',
        },
        {
            title: 'discount',
            dataIndex: 'discount',
            key: 'discount',
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
            title: 'netamount',
            dataIndex: 'netamount',
            key: 'netamount',
        },
        {
            title: 'personnelid_sales',
            dataIndex: 'personnelid_sales',
            key: 'personnelid_sales',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'quantityended',
            dataIndex: 'quantityended',
            key: 'quantityended',
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
            title: 'st_ended',
            dataIndex: 'st_ended',
            key: 'st_ended',
        },
        {
            title: 'unitdiscount',
            dataIndex: 'unitdiscount',
            key: 'unitdiscount',
        },
        {
            title: 'unitprice',
            dataIndex: 'unitprice',
            key: 'unitprice',
        },
        {
            title: 'unitsize',
            dataIndex: 'unitsize',
            key: 'unitsize',
        },
    ];

    return (
        <div className='SaleOrder-report'>
            <h2>Sale Order Report</h2>
            <div>
                <span> จำนวนจาก database : {countByClient} </span>
                <span> จำนวนที่ได้รับ : {countByServer} </span>
            </div>
            <div>
                <RangePicker 
                    format="MM-DD-YYYY" 
                    onChange={(values) => setDates(values || [null, null])} // Safely set dates or default to [null, null]
                />
            </div>
            <Button
                type="primary"
                onClick={handleFetchSaleOrder}
                disabled={!dates[0] || !dates[1]} // Disable if dates are not selected
            >
                ดึงข้อมูล
            </Button>
            <Button
                type="primary"
                onClick={handleCopyData}
                disabled={SaleOrderData.length === 0}
            >
                Copy
            </Button>
            <Table
                dataSource={SaleOrderData}
                columns={columns}
                size='middle'
                loading={loading}
                pagination={{ pageSize: 100 }}
            />
        </div>
    );
};

export default SaleOrderReport;
