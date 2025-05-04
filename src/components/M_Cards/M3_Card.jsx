import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import MeetingIcon from "../../assets/Meeting icon.png";

const M3_Card = ({ meetings }) => {
  if (!meetings || meetings.length === 0) return null;

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

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === "present") return "green";
    if (status?.toLowerCase() === "absent") return "red";
    return "red";
  };

  return (
    <>
      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          sx={{
           
            width: "38vw",
            margin: "0 auto",
            padding: 2,
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #D9D4D4",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            fontFamily: "Tahoma",
            marginBottom: "20px",
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
                <Typography variant="body1" sx={textStyle}>
                  <span style={labelStyle}>Venue:</span> {meeting.venue}
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                  <span style={labelStyle}>Date:</span> {meeting.date}
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                  <span style={labelStyle}>Time:</span> {meeting.time}
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                  <span style={labelStyle}>Reason:</span> {meeting.info}
                </Typography>
                <Typography variant="body1" sx={textStyle}>
                  <span style={labelStyle}>Attendance:</span>
                  <span style={{ color: getStatusColor(meeting.status) }}>
                    {meeting.status || "-"}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default M3_Card;