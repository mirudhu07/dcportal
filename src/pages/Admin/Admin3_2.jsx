import React, { useState, useEffect } from 'react';
import S_Card1 from '../../components/Admin_Cards/S_Card1'; 
import S_Card2 from '../../components/Admin_Cards/S_Card2';
import S_Card3 from '../../components/Admin_Cards/S_Card3';


export default function Admin3_2() {
  const [heading, setHeading] = useState('');
  const fullHeading = '  Meeting Schedules:';
  const headingLength = fullHeading.length;
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < headingLength - 1) {
          setHeading((prev) => {
            console.log(index, fullHeading[index]); 
            return prev + fullHeading[index];
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, []);

     // Fetch all complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/meeting-details");
        const data = await response.json();
        //sorting
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setComplaints(sortedData);
        setComplaints(data); 
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);



  return (
    <div>
    <div style={{ padding: '5px', marginTop: '125px', marginBottom: '15px', marginLeft: '180px' }}>
       <p style={{fontFamily: 'tahoma', fontSize: '30px', color: '#875D7B'}}>{heading}</p>
    </div>
    <div
      className="scroll-content"
      style={{
        marginLeft: '170px', 
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px',
       
        width: '80%', 
        boxSizing: 'border-box', 
        marginBottom: '35px'
    }}
  >
    
    <S_Card2 />
    <S_Card3 />

     {complaints.map((complaint) => (
          <S_Card1 key={complaint.id} complaint={complaint} /> 
        ))}
  </div>
  </div>
  )
}