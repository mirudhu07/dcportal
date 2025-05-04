import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

const AdminCard3 = () => {
  const [adminComplaints, setAdminComplaints] = useState([]);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin-all");
        setAdminComplaints(res.data);
      } catch (error) {
        console.error("Error fetching admin complaints:", error);
      }
    };

    fetchAllComplaints();
  }, []);

  const formatDateTime = (rawDate) => {
    if (!rawDate) return "INVALID DATE";

    const dateObj = new Date(rawDate);

    if (isNaN(dateObj)) {
      console.error("Invalid date object:", rawDate);
      return "INVALID DATE FORMAT";
    }

    const formattedDate = dateObj
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate.toUpperCase()} - ${formattedTime}`;
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
  };

  return (
    <>
      {adminComplaints.map((complaint, index) => (
        <Card
          key={complaint.ID || index}
          sx={{
            width: "28vw",
            margin: "20px auto",
            padding: 2,
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #D9D4D4",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            fontFamily: "Tahoma",
          }}
        >
          <Grid container justifyContent="flex-end" alignItems="center">
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.1rem",
                color: "textSecondary",
            }}
          >
              {formatDateTime(complaint.Date_)}
            </Typography>
          </Grid>
          <CardContent>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Name:</span> {complaint.student_name || "N/A"}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Register No:</span> {complaint.S_ID || "N/A"}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Venue:</span> {complaint.Venue || "N/A"}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Issue:</span> {complaint.Comment || "N/A"}
            </Typography>
            <Typography variant="body1" sx={textStyle}>
              <span style={labelStyle}>Issued By:</span> {complaint.faculty || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AdminCard3;