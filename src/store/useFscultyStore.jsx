 import { create } from "zustand";
import axios from "axios";

const useFacultyStore = create((set) => ({
  students: [],
  fetchStudents: async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/students");
      set({ students: data });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },
  createLog: async (logData) => {
    try {
      await axios.post("http://localhost:5000/api/log-entry", logData);
      alert("Log entry created successfully!");
    } catch (error) {
      console.error("Error creating log entry:", error);
    }
  },
}));

export default useFacultyStore;
 
