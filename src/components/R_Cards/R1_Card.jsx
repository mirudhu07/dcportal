import React, { useState } from "react";
import { Typography, Box, Button, Modal, TextField } from "@mui/material";

let openbox = () => {};

export function ReasonModal() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [complaintCode, setComplaintCode] = useState("");

  // Open modal
    openbox = () => {
      setOpen(true);
  };

  // Close modal
  const handleClose = () => setOpen(false);

  // Submit form
  const handleSubmit = async () => {
    console.log("Submitting reason:", {
      complaintCode,
      reason: text,
    });

    if (!complaintCode || !text) {
      alert("Complaint Code and Reason are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reason", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaintCode: complaintCode,
          reason: text,
        }),
      });

      const result = await response.json();
      console.log("Reason submitted:", result);

      alert(result.message || "Reason submitted successfully.");
    } catch (error) {
      console.error("Error submitting reason:", error);
      alert("Failed to submit the reason. Please try again.");
    } finally {
      setText("");
      setComplaintCode("");
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "#fff7ec",
          width: 500,
          p: 3,
          borderRadius: 2,
          mx: "auto",
          mt: "20vh",
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: 500,
            color: "#555555",
            mb: 1,
          }}
        >
          Complaint Code:
        </Typography>
        <TextField
          fullWidth
          value={complaintCode}
          onChange={(e) => setComplaintCode(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Enter Complaint Code"
        />

        <Typography
          variant="h6"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: 500,
            color: "#555555",
          }}
        >
          Reason:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mt: 1 }}
          placeholder="Enter Reason"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2, backgroundColor: "green", ml: 22 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export { openbox };