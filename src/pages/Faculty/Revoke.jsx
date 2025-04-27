import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/revoke.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Revoke = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: null, message: "" });

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [complaints, filter]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/revoked");
      setComplaints(response.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const applyFilter = () => {
    if (filter === "All") {
      setFilteredComplaints(complaints);
    } else if (filter === "Pending") {
      setFilteredComplaints(complaints.filter((c) => !c.STATUS_));
    } else {
      setFilteredComplaints(complaints.filter((c) => c.STATUS_ === filter));
    }
  };

  const updateStatus = async (roll_no, status) => {
    try {
      await axios.put(`http://localhost:5000/api/revoked/${roll_no}`, { status });
      setModalContent({
        icon:
          status === "Accepted" ? (
            <CheckCircleIcon className="modal-icon accepted" />
          ) : (
            <CancelIcon className="modal-icon declined" />
          ),
        message: `Complaint ${status}!`,
      });
      setModalOpen(true);
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleCardClick = (roll_no) => {
    setExpandedCard((prev) => (prev === roll_no ? null : roll_no));
  };

  return (
    <div className="revoke-container">
      <h2>Revoked Complaints</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Accepted", "Declined", "Pending"].map((type) => (
          <button
            key={type}
            className={filter === type ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="revoke-grid">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.Roll_no}
            className={`revoke-card ${complaint.STATUS_?.toLowerCase() || "pending"} ${
              expandedCard === complaint.Roll_no ? "expanded" : ""
            }`}
            onClick={() => handleCardClick(complaint.Roll_no)}
          >
            <div className="revoke-card-header">
              <p><strong>Name:</strong> {complaint.S_name}</p>
              <p><strong>Register Number:</strong> {complaint.Roll_no}</p>
              {expandedCard === complaint.Roll_no && (
                <p><strong>Reason:</strong> {complaint.REASON}</p>
              )}
            </div>

            {complaint.STATUS_ ? (
              <p className={`status-text ${complaint.STATUS_ === "Accepted" ? "accepted" : "declined"}`}>
                 {complaint.STATUS_}
              </p>
            ) : expandedCard === complaint.Roll_no && (
              <div className="button-group">
                <button className="accept-btn action-btn" onClick={(e) => {e.stopPropagation(); updateStatus(complaint.Roll_no, "Accepted")}}>ACCEPT</button>
                <button className="decline-btn action-btn" onClick={(e) => {e.stopPropagation(); updateStatus(complaint.Roll_no, "Declined")}}>DECLINE</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Status Update</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          {modalContent.icon}
          <Typography variant="h6" sx={{ mt: 2 }}>{modalContent.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Revoke;
