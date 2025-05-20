import React, { useState, useEffect, useRef } from "react";
import {
  Button, TextField, Box, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, IconButton, MenuItem, Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Webcam from "react-webcam";
import useFacultyStore from "../../../store/useFscultyStore";
import '../../../styles/logger.css';

const getLocalDateTimeString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const defaultComplaints = [
  "Late to class",
  "Missing ID card",
  "Regulated Dress Code",
  "Misbehavior",
  "malpractice",
  "Other",
];

const Logger = () => {
  const webcamRef = useRef(null);
  const { students, fetchStudents, createLog, facultyName, reset, setFacultyName } = useFacultyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({ S_ID: "", name: "" });
  const [studentName, setStudentName] = useState("");
  const [timeDate, setTimeDate] = useState(getLocalDateTimeString());
  const [complaint, setComplaint] = useState("");
  const [comment, setComment] = useState("");
  const [venue, setVenue] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ success: true, message: "" });

  useEffect(() => {
    const storedName = sessionStorage.getItem("facultyName");
    if (storedName && !facultyName) {
      setFacultyName(storedName);
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([]);
    } else {
      setFilteredStudents(
        students.filter(
          (s) =>
            (s?.S_ID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (s?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, students]);

  const handleSelectStudent = (student) => {
    setCurrentStudent({ S_ID: student.S_ID, name: student.name });
    setStudentName(student.name);
    setSearchTerm("");
    setFilteredStudents([]);
  };

  const handleCapture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setPhoto(imgSrc);
    setShowWebcam(false);
  };

  const resetFields = () => {
    setCurrentStudent({ S_ID: "", name: "" });
    setStudentName("");
    setPhoto(null);
    setComment("");
    setComplaint("");
    setVenue("");
    setTimeDate(getLocalDateTimeString());
  };

  const handleAddStudent = () => {
    if (!facultyName) {
      const storedName = sessionStorage.getItem("facultyName");
      if (storedName) {
        setFacultyName(storedName);
      } else {
        setModalData({ success: false, message: "Faculty session expired. Please login again." });
        setModalOpen(true);
        return;
      }
    }
    if (!timeDate || (complaint === "Other" && !comment)) {
      setModalData({ success: false, message: "Please fill all required fields (marked with *)." });
      setModalOpen(true);
      return;
    }
    setEntries([
      ...entries,
      {
        S_ID: currentStudent.S_ID || null,
        student_name: studentName || currentStudent.name || null,
        time_date: timeDate,
        venue,
        comment: complaint === "Other" ? comment : complaint,
        photo,
        faculty_name: facultyName,
      },
    ]);
    resetFields();
  };

  // Updated handleSubmit to show duplicate error
  const handleSubmit = async () => {
    if (!facultyName || !timeDate || (complaint === "Other" && !comment)) {
      setModalData({ success: false, message: "Missing required fields. Please check your entries." });
      setModalOpen(true);
      return;
    }
    try {
      const logsToSubmit = entries.length > 0 ? entries : [{
        S_ID: currentStudent.S_ID || null,
        student_name: studentName || currentStudent.name || null,
        time_date: timeDate,
        venue,
        comment: complaint === "Other" ? comment : complaint,
        photo,
        faculty_name: facultyName,
      }];

      // Submit each log and handle duplicate error
      for (const entry of logsToSubmit) {
        try {
          await createLog(entry);
        } catch (error) {
          // If it's a duplicate (409), show the message and stop further submission
          if (error?.response?.status === 409) {
            setModalData({ success: false, message: "This complaint has already been logged." });
            setModalOpen(true);
            return;
          } else {
            setModalData({ success: false, message: "Submission failed. Please try again." });
            setModalOpen(true);
            return;
          }
        }
      }
      setModalData({ success: true, message: "Log(s) submitted successfully!" });
      setEntries([]);
      resetFields();
      reset();
      setShowForm(false);
    } catch (error) {
      setModalData({ success: false, message: "Submission failed. Please try again." });
      setModalOpen(true);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: "calc(100vh - 64px)",
        background: "#f9f9f9",
        position: "relative",
      }}
      className="logger-container"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
        startIcon={<AddIcon />}
        className="create-button"
        sx={{
          position: "fixed",
          top: 88,
          right: 40,
          zIndex: 1201
        }}
      >
        CREATE
      </Button>

      {showForm && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <Paper
            elevation={3}
            className="logger-form"
            sx={{
              mt: 8,
              maxWidth: 630,
              width: "100%",
              borderRadius: 3,
              boxShadow: 4,
              background: "#fff",
              position: "relative",
              marginLeft: "240px",
            }}
          >
            <IconButton onClick={() => setShowForm(false)} sx={{ position: "absolute", top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom>
              Create Log Entry
            </Typography>

            <TextField
              label="Search Student"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            {filteredStudents.length > 0 && (
              <Box className="suggestion-box">
                {filteredStudents.map((s) => (
                  <div
                    key={s.S_ID}
                    onClick={() => handleSelectStudent(s)}
                  >
                    {s.S_ID} - {s.name}
                  </div>
                ))}
              </Box>
            )}

            <TextField
              label="Register Number"
              fullWidth
              value={currentStudent.S_ID}
              disabled
              sx={{ mb: 2 }}
            />

            <TextField
              label="Student Name"
              fullWidth
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Current Date & Time *"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: getLocalDateTimeString() }}
              value={timeDate}
              onChange={(e) => setTimeDate(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Venue"
              fullWidth
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Complaint *"
              fullWidth
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              sx={{ mb: 2 }}
            >
              {defaultComplaints.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            {complaint === "Other" && (
              <TextField
                label="Custom Complaint *"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}

            {photo && (
              <img src={photo} alt="Captured" style={{ width: "100%", marginBottom: "10px" }} />
            )}

            {showWebcam && (
              <>
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "100%" }} />
                <Button onClick={handleCapture} variant="contained" fullWidth sx={{ mt: 1 }}>
                  Capture
                </Button>
              </>
            )}

            <Button onClick={handleAddStudent} variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>
              Add Student to Complaint
            </Button>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                startIcon={<CameraAltIcon />}
                onClick={() => setShowWebcam(true)}
                variant="outlined"
                fullWidth
              >
                Upload Photo
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalData.success ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />} Message
        </DialogTitle>
        <DialogContent>
          <Typography>{modalData.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Logger;
