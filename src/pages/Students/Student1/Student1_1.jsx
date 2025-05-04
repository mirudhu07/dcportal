import React, { useState, useEffect } from 'react';
import Card1 from '../../../components/Cards/Card1';
import Card2 from '../../../components/Cards/Card2';
import Card3 from '../../../components/Cards/Card3';
import Card4 from '../../../components/Cards/Card4';
import Card5 from "../../../components/Cards/Card5"; 
import axios from "axios";
import { ReasonModal} from '../../../components/R_Cards/R1_Card'; 

export default function Student1_1() {
  const studentId = '7376242AD267';
  const [complaints, setComplaints] = useState([]);
  // const [text, setText] = useState('');
  // const fullText = '  HELLO RAHUL 👋';
  // const letters = fullText.split(''); 
  // const textLength = letters.length;
  
  // Typing effect logic
  // useEffect(() => {
  //   let index = 0;
  //   const interval = setInterval(() => {
  //     if (index < textLength) {
  //       setText((prev) => prev + letters[index]);
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/complaints/${studentId}`
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        alert("Failed to fetch complaints. Please try again later.");
      }
    };

    fetchComplaints();
  }, [studentId]);
  
  
  
  return (
    <div>
    <div
      className="scroll-content"
      style={{
        marginLeft: '220px', 
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        gap: '45px',
        maxWidth: '800px', 
        width: "100%", 
        boxSizing: 'border-box', 
        marginBottom: '30px'
      }}
    >
      <p style={{fontFamily: 'tahoma', fontSize: '30px', color: '#875D7B'}}>HELLO RAHUL 👋</p>
      <Card3 />
      <Card2 />
      <Card1 />
      <Card4 />

      {complaints
          .filter((complaint) => complaint.S_ID === studentId)
          .map((complaint) => (
            <Card5 key={complaint.complaint_id} complaint={complaint} />
          ))}
    </div>
    <ReasonModal />
    </div>
  );
}