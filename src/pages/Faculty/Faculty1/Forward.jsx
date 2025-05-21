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
  Grid,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Slide transition for modal
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Forward = () => {
  const [logs, setLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [photoOpen, setPhotoOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");

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
      photo: log.photo,
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

  const handlePhotoView = (photo) => {
    setSelectedPhoto(photo);
    setPhotoOpen(true);
  };

  const handlePhotoClose = () => {
    setPhotoOpen(false);
    setSelectedPhoto("");
  };

  return (
    <Box sx={{ p: 4, ml: { xs: "70px", sm: "70px" } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", marginTop: "0px", marginLeft: "300px" }}
      >
        Forward Complaints to Admin
      </Typography>

      {logs.length === 0 ? (
        <Typography>No complaints found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {logs.map((log) => (
            <Grid item xs={12} sm={6} md={4} key={log.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  transition: "transform 0.3s",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Camera Icon for photo preview */}
                <IconButton
                  onClick={() => handlePhotoView(log.photo)}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <CameraAltIcon />
                </IconButton>

                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    ID: {log.id}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {log.student_name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Date & Time:</strong> {log.time_date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Venue:</strong> {log.venue}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Comment:</strong> {log.comment}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => handleSend(log)}
                >
                  Send to Admin
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Notification Modal */}
      <Dialog open={modalOpen} onClose={handleClose} TransitionComponent={Transition} keepMounted>
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

      {/* Photo Preview Modal */}
      <Dialog open={photoOpen} onClose={handlePhotoClose}>
        <DialogTitle>Student Photo</DialogTitle>
        <DialogContent>
          {selectedPhoto ? (
            <img
              src={`http://localhost:5000/uploads/${selectedPhoto}`}
              alt="Student"
              style={{ maxWidth: "100%", borderRadius: "10px" }}
            />
          ) : (
            <Typography>No photo available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePhotoClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Forward;
