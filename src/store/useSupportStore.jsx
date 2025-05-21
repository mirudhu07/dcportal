import { create } from "zustand";
import axios from "axios";

const useSupportStore = create((set) => ({
  logs: [],

  fetchSupportLogs: async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/support-logs");
      set({ logs: data });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  },

  sendToMentor: async (complaint_id, videoFile, description) => { // Add description parameter
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("complaint_id", complaint_id);
      formData.append("description", description); // Add description to FormData

      await axios.post("http://localhost:5000/api/support/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Sent to mentor successfully!");
    } catch (error) {
      console.error("Send error:", error);
    }
  },
}));

export default useSupportStore;
