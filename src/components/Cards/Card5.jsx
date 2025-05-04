import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { ReasonModal, openbox } from "../R_Cards/R1_Card"; 
import axios from "axios";

const ComplaintCard5 = ({ complaint }) => {
  const localStorageKey = `complaint-timer-${complaint.complaint_id}`;
  const [timer, setTimer] = useState(6 * 60 * 60); 
  const [isFrozen, setIsFrozen] = useState(false);
  const [k, setK] = useState(1);
  const [buttonsDisabled, setButtonsDisabled] = useState(false); 


  useEffect(() => {
    const storedStatus = localStorage.getItem(`${localStorageKey}-status`);
    const storedTime = localStorage.getItem(`${localStorageKey}-time`);

    if (storedStatus === "frozen" && storedTime) {
      setIsFrozen(true);
      setTimer(parseInt(storedTime, 10));
      setK(0);
      setButtonsDisabled(true); 
    }
  }, [localStorageKey]);


  useEffect(() => {
    if (isFrozen || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const updated = prev - 1;
        if (updated <= 0) {
          clearInterval(interval);
          return 0;
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFrozen, timer]);


  const formatTimer = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };


  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const day = date.toLocaleString("en-US", { day: "2-digit" });
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = date.getFullYear();
    const time = date
      .toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
    return `${day} ${month} ${year} - ${time}`;
  };

  const handleStatusUpdate = async (status) => {
    if (k === 0) {
      alert("Already responded");
      return;
    }

    try {
      setIsFrozen(true);
      setK(0);
      setButtonsDisabled(true); // <- Disable after one click
      localStorage.setItem(`${localStorageKey}-status`, "frozen");
      localStorage.setItem(`${localStorageKey}-time`, timer.toString());

      await axios.put(
        `http://localhost:5000/complaints/update-status/${complaint.S_ID}/${complaint.complaint_id}`,
        { status }
      );

      alert('Your response has been submitted!');
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleAccept = () => {
    handleStatusUpdate("Accepted");
  };

  const handleRevoke = () => {
    handleStatusUpdate("Pending");
    openbox();
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
      <Card
        sx={{
          width: "60vw",
          margin: "0 auto",
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
            {formatDateTime(complaint.time_date)}
          </Typography>
        </Grid>
        <CardContent>
          <Typography variant="body1" sx={textStyle}>
            <span style={labelStyle}>Complaint code:</span> {complaint.complaint_id}
          </Typography>
          <Typography variant="body1" sx={textStyle}>
            <span style={labelStyle}>Venue:</span> {complaint.venue}
          </Typography>
          <Typography variant="body1" sx={textStyle}>
            <span style={labelStyle}>Complaint Details:</span> {complaint.comment}
          </Typography>
          <Typography variant="body1" sx={textStyle}>
            <span style={labelStyle}>Faculty:</span> {complaint.faculty_name}
          </Typography>
          <Typography variant="body1" sx={textStyle}>
            <span style={labelStyle}>Timer:</span>{" "}
            <span style={{ color: "red" }}>{formatTimer(timer)}</span>
          </Typography>
        </CardContent>

        <Grid container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ fontFamily: "sans-serif", fontSize: "0.95rem" }}
              onClick={handleAccept}
              disabled={buttonsDisabled} 
            >
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              sx={{ fontFamily: "sans-serif", fontSize: "0.95rem" }}
              onClick={handleRevoke}
              disabled={buttonsDisabled} 
            >
              Revoke
            </Button>
          </Grid>
        </Grid>
      </Card>
      <ReasonModal />
    </>
  );
};

export default ComplaintCard5;