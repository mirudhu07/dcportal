import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const HCard4 = () => {
  const textStyle = {
    fontFamily: 'sans-serif',
    fontSize: '1.2rem',
    color: '#555555',
    fontWeight: 400,
  };

  const labelStyle = {
    fontFamily: 'sans-serif',
    fontSize: '1.2rem',
    color: '#000000',
    fontWeight: 500,
    display: 'inline',
    marginRight: '6px',
  };

  return (
    <Card
      sx={{
        
        width: '25vw',
        margin: '0 auto',
        padding: 2,
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #D9D4D4',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Tahoma',
      }}
    >
      <Grid container justifyContent="flex-end" alignItems="center">
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontFamily: 'sans-serif',
            fontSize: '1.1rem',
            color: 'textSecondary',
          }}
        >
          07 APR 2025 - 03:00 PM
        </Typography>
      </Grid>
      <CardContent>
        <Typography variant="body1" component="p" sx={textStyle}>
          <span style={labelStyle}>Issue:</span> No proper haircut
        </Typography>
        <Typography variant="body1" component="p" sx={textStyle}>
          <span style={labelStyle}>Venue:</span> AI&DS lab-3
        </Typography>
        <Typography variant="body1" component="p" sx={textStyle}>
          {/* <span style={labelStyle}>Status:</span> */}
          <span style={{ color: 'red' }}>Revoked</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HCard4;