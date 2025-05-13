import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useFacultyStore = create(
  persist(
    (set) => ({
      facultyName: "",
      students: [],
      setFacultyName: (name) => set({ facultyName: name }),
      fetchStudents: async () => {
        try {
          const res = await axios.get("http://localhost:5000/students");
          set({ students: res.data });
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      },
      createLog: async (logData) => {
        try {
          await axios.post("http://localhost:5000/api/log-entry", logData);
        } catch (error) {
          console.error("Error creating log entry:", error);
        }
      },
    }),
    {
      name: "faculty-store", // Key for localStorage
      partialize: (state) => ({ facultyName: state.facultyName }), // Only persist facultyName
    }
  )
);

export default useFacultyStore;
