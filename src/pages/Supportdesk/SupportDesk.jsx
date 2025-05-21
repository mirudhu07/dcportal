import React, { useEffect, useState, forwardRef } from "react";
import useSupportStore from "../../store/useSupportStore";
import {
  Box,
  Button,
  Typography,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  TextField,
} from "@mui/material";
import "../../styles/Supportdesk.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SupportDesk = () => {
  const { logs, fetchSupportLogs, sendToMentor } = useSupportStore();
  const [selectedVideo, setSelectedVideo] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [description, setDescription] = useState({});

  useEffect(() => {
    fetchSupportLogs();
  }, [fetchSupportLogs]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSend = async (id) => {
    if (!selectedVideo[id]) {
      setModalMessage("Please upload a video before sending");
      setModalOpen(true);
      return;
    }

    if (!description[id]?.trim()) {
      setModalMessage("Please provide a description before sending");
      setModalOpen(true);
      return;
    }

    try {
      await sendToMentor(id, selectedVideo[id], description[id]);
      setModalMessage("Video and description sent to mentor successfully!");
    } catch (error) {
      setModalMessage("Failed to send to mentor. Please try again.");
    } finally {
      setModalOpen(true);
      setEditingId(null);
      setSelectedVideo(prev => ({ ...prev, [id]: null }));
      setDescription(prev => ({ ...prev, [id]: "" }));
      fetchSupportLogs();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase() === "accepted" ? "accepted" 
      : status.toLowerCase() === "declined" ? "declined" 
      : "pending";
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, mt: 10, ml: 19, p: "-50px" }}>
        Support Desk - Unassigned Complaints
      </Typography>

      {logs.length === 0 ? (
        <Typography>No unassigned logs found.</Typography>
      ) : (
        <div className="complaints-container">
          {logs.map((log) => (
            <Box 
              key={log.complaint_id}
              className={`complaint-card ${getStatusClass(log.status || "pending")}`}
              sx={{ mb: 3, p: 3, ml: 4 }}
            >
              <Typography className={`status-label status-${(log.status || "pending").toLowerCase()}`}>
                {log.status || "Pending"}
              </Typography>
              <Typography><b>ID:</b> {log.complaint_id}</Typography>
              <Typography><b>Time:</b> {log.time_date}</Typography>
              <Typography><b>Complaint:</b> {log.comment}</Typography>
              <Typography><b>Venue:</b> {log.venue}</Typography>

              {editingId === log.complaint_id && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Upload Response Video:
                  </Typography>

                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setSelectedVideo(prev => ({
                      ...prev,
                      [log.complaint_id]: e.target.files[0]
                    }))}
                  />

                  {selectedVideo[log.complaint_id] && (
                    <Box sx={{ mt: 2 }}>
                      <video
                        controls
                        width="100%"
                        style={{ maxHeight: 300 }}
                        src={URL.createObjectURL(selectedVideo[log.complaint_id])}
                      />
                    </Box>
                  )}

                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    value={description[log.complaint_id] || ""}
                    onChange={(e) => setDescription(prev => ({
                      ...prev,
                      [log.complaint_id]: e.target.value
                    }))}
                    sx={{ mt: 2 }}
                  />
                </Box>
              )}

              <Box className="complaint-buttons">
                <button 
                  className="accept-button" 
                  onClick={() => handleEdit(log.complaint_id)}
                >
                  Edit
                </button>
                <button 
                  className="decline-button" 
                  onClick={() => handleSend(log.complaint_id)}
                >
                  Send
                </button>
              </Box>
            </Box>
          ))}
        </div>
      )}

      <Dialog 
        open={modalOpen} 
        TransitionComponent={Transition} 
        onClose={handleCloseModal}
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportDesk;
