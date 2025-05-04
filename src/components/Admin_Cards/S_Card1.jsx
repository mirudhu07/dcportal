import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box, Button } from "@mui/material";
import MeetingIcon from "../../assets/Meeting icon.png";

const S_Card1 = ({ complaint }) => {
  const [attendance, setAttendance] = useState(complaint.status || "pending");

  // Internal state to force re-render if needed
  const [reload, setReload] = useState(false);

  const handleAttendance = (status) => {
  console.log("Updating attendance to:", status);
  setAttendance(status);

    fetch("http://localhost:5000/api/update-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sId: complaint.sId,
        venue: complaint.venue,
        date: complaint.date,
        status: status,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.message === "Attendance updated successfully") {
          console.log("Attendance updated successfully!");
          setReload(!reload); 
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

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

  const getAttendanceColor = () => {
    if (attendance === "present") return "green";
    if (attendance === "absent") return "red";
    return "red";
  };

  return (
    <Card
      sx={{
       
        width: "35vw",
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
            <Box component="img" src={MeetingIcon} alt="Meeting Icon" sx={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Register No:</span> {complaint.sId}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Venue:</span> {complaint.venue}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Date:</span> {complaint.date}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Time:</span> {complaint.time}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Reason:</span> {complaint.info}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Attendance:</span>
              <span style={{ color: getAttendanceColor() }}> {attendance}</span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justifyContent="flex-end" spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            sx={{ fontFamily: "sans-serif", fontSize: "0.95rem" }}
            onClick={() => handleAttendance("present")}
          >
            Present
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            sx={{ fontFamily: "sans-serif", fontSize: "0.95rem" }}
            onClick={() => handleAttendance("absent")}
          >
            Absent
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default S_Card1;