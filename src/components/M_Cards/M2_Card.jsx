import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import MeetingIcon from "../../assets/Meeting icon.png"; 

const M2_Card = () => {
  const textStyle = {
    fontFamily: "sans-serif",
    fontSize: "1.2rem",
    color: "#555555",
    fontWeight: 400,
  };

  const labelStyle = {
    fontFamily: "sans-serif",
    fontSize: "1.2rem",
    color: "#000000",
    fontWeight: 500,
    display: "inline",
    marginRight: "6px",
    marginLeft: "15px",
  };

  return (
    <Card
      sx={{
       
        width: "38vw",
        margin: "0 auto",
        padding: 2,
        borderRadius: "14px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #D9D4D4",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Tahoma",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "sans-serif",
            fontSize: "1.1rem",
            color: "red",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          ENQUIRY MEETING
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box
              component="img"
              src={MeetingIcon}
              alt="Meeting Icon"
              sx={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" component="p" sx={textStyle}>
              <span style={labelStyle}>Venue:</span> Faculty Hall - 3 (New Mechanical Block)
            </Typography>
            <Typography variant="body1" component="p" sx={textStyle}>
              <span style={labelStyle}>Date:</span> 10-04-2025
            </Typography>
            <Typography variant="body1" component="p" sx={textStyle}>
              <span style={labelStyle}>Time:</span> 2:00 PM
            </Typography>
            <Typography variant="body1" component="p" sx={textStyle}>
              <span style={labelStyle}>Reason:</span> Enquiry for the complaint filed on 02.04.2025 at 02:00 PM
            </Typography>
            <Typography variant="body1" component="p" sx={textStyle}>
              <span style={labelStyle}>Attendance:</span> 
              <span style={{color: 'red'}}>pending</span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default M2_Card;