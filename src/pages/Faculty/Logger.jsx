import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import useFacultyStore from "../../store/useFscultyStore";

const Logger = () => {
  const { students, fetchStudents, createLog } = useFacultyStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [SID, setSID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [facultyName, setFacultyName] = useState("");

  const [timeDate, setTimeDate] = useState("");
  const [comment, setComment] = useState("");
  const [venue, setVenue] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([]);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          (student?.S_ID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (student?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, students]);

  const handleSelectStudent = (student) => {
    setSID(student.S_ID);
    setStudentName(student.name);
    setSearchTerm("");
    setFilteredStudents([]);
  };

  const handleSubmit = () => {
    if (!facultyName || !timeDate || !comment || !venue) {
      alert("All fields are required");
      return;
    }

    createLog({
      S_ID: SID,
      student_name: studentName,
      faculty_name: facultyName,
      time_date: timeDate,
      comment,
      venue,
    });

    // Reset form
    setSID("");
    setStudentName("");
    setFacultyName("");
    setTimeDate("");
    setComment("");
    setVenue("");
    setShowForm(false);
  };

  return (
    <Box sx={{ p: 3, 
      maxWidth: 600, 
      mx: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "250px"
      }}>
      
      {!showForm && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            + CREATE
          </Button>
        </Box>
      )}

      {showForm && (
        <Box
          sx={{
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
            boxShadow: 3,
            
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Create Log Entry
          </Typography>

          {/* Search Student */}
          <TextField
            label="Search Student"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            autoComplete="off"
          />
          {filteredStudents.length > 0 && (
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                maxHeight: 150,
                overflowY: "auto",
                background: "white",
              }}
            >
              {filteredStudents.map((student) => (
                <Box
                  key={student.S_ID}
                  sx={{
                    padding: "10px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                  onClick={() => handleSelectStudent(student)}
                >
                  {student.S_ID} - {student.name}
                </Box>
              ))}
            </Box>
          )}

          {/* Register Number */}
          <TextField label="Register Number" fullWidth value={SID} disabled sx={{ mb: 2 }} />

          {/* Student Name */}
          <TextField label="Student Name" fullWidth value={studentName} disabled sx={{ mb: 2 }} />

          {/* Faculty Name */}
          <TextField
            label="Faculty Name"
            fullWidth
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Date & Time */}
          <TextField
            type="datetime-local"
            fullWidth
            value={timeDate}
            onChange={(e) => setTimeDate(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Comment */}
          <TextField
            label="Comment"
            multiline
            rows={3}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Venue */}
          <TextField
            label="Venue"
            fullWidth
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Submit & Cancel */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Logger;
