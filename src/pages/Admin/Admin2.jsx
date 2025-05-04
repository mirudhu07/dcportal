import React, { useState, useEffect } from 'react';
import AdminCard3 from '../../components/Admin_Cards/A3_Card';
import AdminCard1 from '../../components/Admin_Cards/A1_Card';
import AdminCard2 from '../../components/Admin_Cards/A2_Card';

export default function Admin2() {
  const [heading, setHeading] = useState('');
  const fullHeading = '  Received Complaints:';
  const headingLength = fullHeading.length;
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < headingLength - 1) {
        setHeading((prev) => prev + fullHeading[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ padding: '5px', marginTop: '125px', marginBottom: '15px', marginLeft: '170px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '30px', color: '#875D7B' }}>{heading}</p>
      </div>

      <div
        className="scroll-content"
        style={{
          marginLeft: '90px', 
          marginTop: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
         
          width: '80%', 
          boxSizing: 'border-box', 
          marginBottom: '35px'
        }}
      >
        <AdminCard1 />
        <AdminCard2 />
        
        <AdminCard3 />
      </div>
    </div>
  );
}