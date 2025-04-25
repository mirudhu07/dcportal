import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";

// Slide transition for modal
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Forward = () => {
  const [logs, setLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/faculty-logger")
      .then((res) => {
        setLogs(res.data);
      })
      .catch(() => {
        setModalMessage("Failed to fetch logs.");
        setModalOpen(true);
      });
  }, []);

  const handleSend = (log) => {
    const payload = {
      student_name: log.student_name,
      S_ID: log.S_ID,
      Date_: log.time_date.split("T")[0],
      Time_: log.time_date.split("T")[1].slice(0, 8),
      Venue: log.venue,
      Comment: log.comment,
      faculty: log.faculty,
    };

    axios
      .post("http://localhost:5000/send-to-admin", payload)
      .then(() => {
        setModalMessage("Sent to admin successfully!");
        setModalOpen(true);
      })
      .catch(() => {
        setModalMessage("Failed to send complaint.");
        setModalOpen(true);
      });
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Forward Complaints to Admin
      </Typography>

      {logs.length === 0 ? (
        <Typography>No complaints found.</Typography>
      ) : (
        logs.map((log) => (
          <Paper key={log.id} sx={{ mb: 3, p: 2 }}>
            <Typography><b>ID:</b> {log.id}</Typography>
            <Typography><b>Student:</b> {log.student_name}</Typography>
            <Typography><b>Date & Time:</b> {log.time_date}</Typography>
            <Typography><b>Venue:</b> {log.venue}</Typography>
            <Typography><b>Comment:</b> {log.comment}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => handleSend(log)}
            >
              Send to Admin
            </Button>
          </Paper>
        ))
      )}

      {/* Animated Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Forward;
