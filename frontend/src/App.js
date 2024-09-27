import React, { useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import VerifyPinProvider from './components/VerifyPinProvider/VerifyPinProvider';

function App() {
  const [isVerified, setIsVerified] = useState(false);

  // ฟังก์ชันที่จะเรียกเมื่อยืนยัน PIN สำเร็จ
  const handleVerified = () => {
    setIsVerified(true);
  };

  return (
    <div className="App">
      {isVerified ? (
        <Homepage />
      ) : (
        <VerifyPinProvider onVerified={handleVerified} />
      )}
    </div>
  );
}

export default App;
