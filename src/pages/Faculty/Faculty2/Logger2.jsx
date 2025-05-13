import React, { useState, useEffect, useRef } from "react";
import {
  Button, TextField, Box, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, Fade, IconButton, MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Webcam from "react-webcam";
import useFacultyStore from "../../../store/useFscultyStore";

const defaultComplaints = [
  "Late to class",
  "Missing ID card",
  "Regulated Dress Code",
  "Misbehavior",
  "malpractice",
  "Other",
];

const facultyList = [
  "faculty1",
  "faculty2",
  "faculty3",
];

const Logger2 = () => {
  const webcamRef = useRef(null);
  const { students, fetchStudents, createLog } = useFacultyStore();

  const [facultyName, setFacultyName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({ S_ID: "", name: "" });
  const [timeDate, setTimeDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const [comment, setComment] = useState("");
  const [venue, setVenue] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ success: true, message: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") setFilteredStudents([]);
    else {
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
    setSearchTerm("");
    setFilteredStudents([]);
  };

  const handleCapture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setPhoto(imgSrc);
    setShowWebcam(false);
  };

  // Prevent duplicate except for "malpractice"
  const handleAddStudent = () => {
    if (!facultyName || !timeDate || !venue || (complaint === "Other" && !comment)) {
      setModalData({ success: false, message: "Please fill all required fields." });
      setModalOpen(true);
      return;
    }
    if (!currentStudent.S_ID) {
      setModalData({ success: false, message: "Please select a student." });
      setModalOpen(true);
      return;
    }
    if (
      complaint !== "malpractice" &&
      entries.some(
        (e) =>
          e.S_ID === currentStudent.S_ID &&
          (complaint === "Other"
            ? e.comment === comment
            : e.comment === complaint)
      )
    ) {
      setModalData({ success: false, message: "Duplicate log for this student and complaint is not allowed." });
      setModalOpen(true);
      return;
    }
    setEntries([
      ...entries,
      {
        ...currentStudent,
        time_date: timeDate,
        venue,
        comment: complaint === "Other" ? comment : complaint,
        photo,
        faculty_name: facultyName,
      },
    ]);
    setCurrentStudent({ S_ID: "", name: "" });
    setPhoto(null);
  };

  const handleSubmit = async () => {
    if (!facultyName) {
      setModalData({ success: false, message: "Faculty name is missing." });
      setModalOpen(true);
      return;
    }
    if (entries.length === 0) {
      setModalData({ success: false, message: "No entries to submit." });
      setModalOpen(true);
      return;
    }
    try {
      for (const entry of entries) {
        await createLog({
          S_ID: entry.S_ID,
          student_name: entry.name,
          faculty_name: entry.faculty_name,
          time_date: entry.time_date,
          comment: entry.comment,
          venue: entry.venue,
          photo: entry.photo,
        });
      }
      setModalData({ success: true, message: "Log(s) created successfully!" });
      setEntries([]);
      setTimeDate("");
      setComment("");
      setVenue("");
      setComplaint("");
      setShowForm(false);
    } catch (error) {
      setModalData({ success: false, message: "Error submitting logs." });
    } finally {
      setModalOpen(true);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Box sx={{ p: 3, width: "100%", minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f9f9f9", position: "relative" }}>
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ position: "fixed", top: 100, right: 40, zIndex: 1000 }}>
        + CREATE
      </Button>

      {showForm && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "200px", mt: 8 }}>
          <Paper sx={{ p: 3, width: "100%", maxWidth: 600, borderRadius: 4, backgroundColor: "#fff", position: "relative" }}>
            <IconButton onClick={() => setShowForm(false)} sx={{ position: "absolute", top: 10, left: 10, color: "black" }}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              Create Log Entry
            </Typography>

            <TextField
              select
              label="Faculty Name"
              fullWidth
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              sx={{ mb: 2 }}
            >
              {facultyList.map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Search Student" fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ mb: 2 }} />

            {filteredStudents.length > 0 && (
              <Paper sx={{ maxHeight: 150, overflowY: "auto", mb: 2, backgroundColor: "#fff" }}>
                {filteredStudents.map((s) => (
                  <Fade in key={s.S_ID}>
                    <Box p={1} onClick={() => handleSelectStudent(s)} sx={{ cursor: "pointer", ":hover": { background: "#eee" } }}>
                      {s.S_ID} - {s.name}
                    </Box>
                  </Fade>
                ))}
              </Paper>
            )}

            <TextField label="Register Number" fullWidth value={currentStudent.S_ID} disabled sx={{ mb: 2 }} />
            <TextField label="Student Name" fullWidth value={currentStudent.name} disabled sx={{ mb: 2 }} />
            <TextField type="datetime-local" fullWidth value={timeDate} onChange={(e) => setTimeDate(e.target.value)} inputProps={{ min: getMinDateTime() }} sx={{ mb: 2 }} />

            <TextField select fullWidth label="Select Complaint" value={complaint} onChange={(e) => setComplaint(e.target.value)} sx={{ mb: 2 }}>
              {defaultComplaints.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {complaint === "Other" && (
              <TextField label="Custom Comment" multiline rows={3} fullWidth value={comment} onChange={(e) => setComment(e.target.value)} sx={{ mb: 2 }} />
            )}

            <TextField label="Venue" fullWidth value={venue} onChange={(e) => setVenue(e.target.value)} sx={{ mb: 2 }} />

            {showWebcam && (
              <Box sx={{ mb: 2 }}>
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" />
                <Button startIcon={<CameraAltIcon />} onClick={handleCapture} fullWidth variant="outlined" sx={{ my: 1 }}>
                  Capture ID Card
                </Button>
              </Box>
            )}

            <Button startIcon={<AddIcon />} variant="contained" fullWidth onClick={handleAddStudent} sx={{ mb: 2 }}>
              Add Student to Complaint
            </Button>

            {entries.length > 0 && <Typography sx={{ mb: 1 }}>{entries.length} student(s) added</Typography>}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="outlined" onClick={() => setShowWebcam(true)} sx={{ flex: 1, mr: 1 }}>
                Upload ID
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ flex: 1 }}>
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalData.success ? (
            <CheckCircleIcon color="success" sx={{ verticalAlign: "middle", mr: 1 }} />
          ) : (
            <ErrorIcon color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
          )}
          Status
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

export default Logger2;
