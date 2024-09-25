import { react, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import apiService from '../../services/apiService';

const Home = () => {
    const [MATData, setMATData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchMAT = async () => {
        console.log("active-handleFetchMAT");
        setLoading(true);

        try {
            const response = await apiService.fetchMAT();
            if (response) {
                console.log("fetchMAT complete ");
                setMATData(response.data);
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

    return (
        <div>
            <h2>Home page</h2>
            <Button
                type="primary"
                onClick={handleFetchMAT}
            >
                fetch MAT report
            </Button>
        </div>
    );
};

export default Home;
