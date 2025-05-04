import React, { useState, useEffect } from 'react';
import M1_Card from '../../../components/M_Cards/M1_Card'; 
import M2_Card from '../../../components/M_Cards/M2_Card';
import M3_Card from '../../../components/M_Cards/M3_Card';


export default function Student2_3() {
  const [heading, setHeading] = useState('');
  const fullHeading = '  Scheduled Meetings:';
  const headingLength = fullHeading.length;
  const [meetings, setMeetings] = useState([]); 
  const studentId = '7376242CS111';
  
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

  useEffect(() => {
          const fetchMeetings = async () => {
            try {
              const response = await fetch("http://localhost:5000/api/meeting-details");
              const data = await response.json();
              console.log("Fetched Meetings:", data);
              const filteredMeetings = data.filter((meeting) => {
                console.log("Meeting S_ID:", meeting.sId, "Student ID:", studentId); 
                return meeting.sId === studentId; 
              });
              console.log("Filtered Meetings for Student:", filteredMeetings);
              setMeetings(filteredMeetings);
            } catch (error) {
              console.error("Error fetching meetings:", error);
            }
          };
      
          fetchMeetings();
        }, [studentId]);


  return (
    <div>
    <div style={{ padding: '5px', marginTop: '125px', marginBottom: '15px', marginLeft: '170px' }}>
       <p style={{fontFamily: 'sans-serif', fontSize: '28px', color: '#875D7B'}}>{heading}</p>
    </div>
    <div
      className="scroll-content"
      style={{
        marginLeft: '180px', 
        marginTop: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '35px',
       
        width: '80%', 
        boxSizing: 'border-box', 
        marginBottom: '35px'
    }}
  >
    <M2_Card />
    <M1_Card />
    <M3_Card meetings={meetings} />
  </div>
  </div>
  )
}