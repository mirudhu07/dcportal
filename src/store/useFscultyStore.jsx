import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const initialState = {
  students: [],
  facultyName: "",
};

const useFacultyStore = create(
  persist(
    (set) => ({
      ...initialState,
      fetchStudents: async () => {
        try {
          const res = await axios.get("http://localhost:5000/students");
          set({ students: res.data });
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      },
      setFacultyName: (name) => set({ facultyName: name }),
      // Throw error to handle in frontend
      createLog: async (logData) => {
        try {
          await axios.post("http://localhost:5000/api/log-entry", logData);
        } catch (error) {
          // Throw error to be handled in Logger.js
          throw error;
        }
      },
      reset: () => set({ ...initialState, facultyName: sessionStorage.getItem("facultyName") || "" }),
    }),
    {
      name: "faculty-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useFacultyStore;
