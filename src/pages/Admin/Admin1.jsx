import React, { useEffect, useState} from 'react';
import Welcome_Card  from '../../components/Admin_Cards/Welcome_card';

export default function Admin1() {
  // const [text, setText] = useState('');
  // const fullText = '  WELCOME  ADMIN 👋';
  // const textLength = fullText.length;


  // useEffect(() => {
  //   let index = 0;
  //   const interval = setInterval(() => {
  //     if (index < textLength - 1) {
  //       setText((prev) => {
  //         console.log(index, fullText[index]); 
  //         return prev + fullText[index];
  //       });
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div style={{marginBottom: '160px'}}>
      <div style={{display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            textAlign: 'center', 
            height: '150px',
            marginTop: '50px',
            }}>

            <p style={{fontFamily: 'sans-serif', 
              fontSize: '2.2rem', 
              margin: 0, 
              marginLeft: '570px', 
              fontWeight: '525',
              color: '#875D7B'}}>WELCOME  ADMIN 👋</p>
      </div>

      <div style={{ marginTop: '90px', marginLeft: '550px'}}>
         <Welcome_Card />
      </div>
      
    </div>
  )
}