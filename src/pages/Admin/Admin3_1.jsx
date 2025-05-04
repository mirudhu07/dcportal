import React, { useState } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Admin3_1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    venue: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () =>{
      setFormData({
        studentId: "",
        venue: "",
        date: "",
        time: "",
        reason: "",
      })
      alert("Form Cleared!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/meeting-details", formData);
      alert(response.data.message);
      setFormData({ studentId: "", venue: "", date: "", time: "", reason: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit meeting details. Please try again.");
    }
  };

  return (
    <div style={{ marginLeft: "450px", marginTop: "120px", marginBottom: "30px" }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "500px",
          margin: "auto",
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        
        <IconButton
          sx={{ position: "absolute", top: 9, right: 8 }}
          onClick={() => navigate("/admin3")}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" gutterBottom>
          Create Meeting
        </Typography>

        <TextField
          label="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />
        <div style={{display: "inline-block"}}>
        
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{mt: 2, borderRadius: "6px"}}
          style={{width: "150px",  backgroundColor: "red"}}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: "6px"}}
          style={{width: "150px", marginLeft: "150px"}}
        >
          Create <i class="bi bi-plus-lg" style={{marginLeft: "10px", marginTop: "2px"}}></i>
        </Button>
        </div>
      </Box>
    </div>
  );
}