// src/components/VerifyPinProvider.js
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import apiService from '../../services/apiService';
import './VerifyPinProvider.css';

const VerifyPinProvider = ({ onVerified }) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      message.error('กรุณากรอก PIN 4 หลัก');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.verifyPin(pin); // ส่งค่า pin ที่เป็น int
      if (response) {
        message.success('ยืนยัน PIN สำเร็จ');
        onVerified(); // เรียก callback เมื่อ PIN ถูกต้อง
      }
    } catch (error) {
        if (error.status === 401) {
            message.error('PIN ไม่ถูกต้อง กรุณาลองอีกครั้ง');
            setPin(''); // รีเซ็ตฟอร์ม PIN
        } else if (error.status === 500) {
            message.error('เซิร์ฟเวอร์ล้มเหลว กรุณาติดต่อผู้ดูแลระบบ');
            setPin(''); // รีเซ็ตฟอร์ม PIN
        }
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันที่ใช้กรองเฉพาะตัวเลข
  const handlePinChange = (e) => {
    const value = e.target.value;
    // ใช้ regex เพื่อเช็คว่าค่าเป็นตัวเลขเท่านั้น
    if (/^\d*$/.test(value)) {
      setPin(value); // อัปเดต state เฉพาะเมื่อค่าเป็นตัวเลข
    }
  };

  // ฟังก์ชันที่ตรวจจับการกดปุ่ม Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePinSubmit(); // เรียกฟังก์ชันเมื่อกด Enter
    }
  };

  return (
    <div className='VerifyPinProvider'>
      <div className='welcome-login'>
        <h2>ยินดีต้อนรับเข้าสู่ระบบดึงรายงาน Backup ERP</h2>
        <p>กรุณากรอก PIN เพื่อเข้าใช้งานระบบ <br></br> หากระบบมีปัญหาหรือไม่สามารถเข้าสู่ระบบได้โปรดติดต่อผู้ดูแลระบบ</p>
      </div>
      <div className="verify-pin">
        <h2>กรุณากรอก PIN</h2>
        <Input
          type="password"
          value={pin}
          maxLength={4}
          onChange={handlePinChange}
          onKeyPress={handleKeyPress} // เพิ่มการตรวจจับการกดปุ่ม Enter
          placeholder="PIN 4 หลัก"
          disabled={loading}
          style={{ width: '200px', marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handlePinSubmit} loading={loading}>
          ยืนยัน
        </Button>
      </div>
    </div>
  );
};

export default VerifyPinProvider;
