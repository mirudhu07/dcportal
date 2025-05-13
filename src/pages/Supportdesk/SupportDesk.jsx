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
  TextField,  // Added for description input
} from "@mui/material";
import "../../styles/Supportdesk.css";

// Slide animation for modal
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SupportDesk = () => {
  const { logs, fetchSupportLogs, sendToMentor } = useSupportStore();
  const [selectedVideo, setSelectedVideo] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [description, setDescription] = useState({}); // Store description for each log

  useEffect(() => {
    fetchSupportLogs();
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSend = async (id) => {
    if (!selectedVideo[id]) {
      setModalMessage("Please upload a video before sending");
      setModalOpen(true);
      return;
    }

    if (!description[id] || description[id].trim() === "") {
      setModalMessage("Please provide a description before sending");
      setModalOpen(true);
      return;
    }

    await sendToMentor(id, selectedVideo[id], description[id]);
    setEditingId(null);
    setSelectedVideo((prev) => ({ ...prev, [id]: null }));
    setDescription((prev) => ({ ...prev, [id]: "" })); // Reset description
    fetchSupportLogs();

    setModalMessage("Video and description sent to mentor successfully!");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getStatusClass = (status) => {
    if (status === "Accepted") return "accepted";
    if (status === "Declined") return "declined";
    return "pending";
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, marginTop: "100px", marginLeft: "190px",padding: "-50px", }}>
        Support Desk - Unassigned Complaints
      </Typography>

      {logs.length === 0 ? (
        <Typography>No unassigned logs found.</Typography>
      ) : (
        <div className="complaints-container">
          {logs.map((log) => {
            const status = log.status || "Pending";
            const statusClass = getStatusClass(status);

            return (
              <Box key={log.complaint_id} 
              className={`complaint-card ${statusClass}`}
              sx={{ mb: 3, padding: "30px", marginLeft: "40px" }}
              >
                <Typography className={`status-label status-${status.toLowerCase()}`}>
                  {status}
                </Typography>
                <Typography><b>ID:</b> {log.complaint_id}</Typography>
                <Typography><b>Time:</b> {log.time_date}</Typography>
                <Typography><b>Complain:</b> {log.comment}</Typography>
                <Typography><b>Venue:</b> {log.venue}</Typography>

                {editingId === log.complaint_id && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Upload Response Video:
                    </Typography>

                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        setSelectedVideo((prev) => ({
                          ...prev,
                          [log.complaint_id]: e.target.files[0],
                        }))
                      }
                    />

                    {selectedVideo[log.complaint_id] && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">Preview:</Typography>
                        <video
                          controls
                          width="100%"
                          style={{ maxHeight: 300 }}
                          src={URL.createObjectURL(selectedVideo[log.complaint_id])}
                        />
                      </Box>
                    )}

                    {/* Added description input */}
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      value={description[log.complaint_id] || ""}
                      onChange={(e) =>
                        setDescription((prev) => ({
                          ...prev,
                          [log.complaint_id]: e.target.value,
                        }))
                      }
                      sx={{ mt: 2 }}
                    />
                  </Box>
                )}

                <Box className="complaint-buttons">
                  <button className="accept-button" onClick={() => handleEdit(log.complaint_id)}>
                    Edit
                  </button>
                  <button className="decline-button" onClick={() => handleSend(log.complaint_id)}>
                    Send
                  </button>
                </Box>
              </Box>
            );
          })}
        </div>
      )}

      {/* Modal for alerts with animation */}
      <Dialog open={modalOpen} TransitionComponent={Transition} keepMounted onClose={handleCloseModal}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportDesk;
