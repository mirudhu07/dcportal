import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../pages/firebase";
import useFacultyStore from "../store/useFscultyStore"; // ✅ Fixed typo in filename

export const handleLogin = (username, password, navigate) => {
  const setFacultyName = useFacultyStore.getState().setFacultyName; // ✅ Zustand state outside React components

  if (username === "Rahul K" && password === "pass1") {
    navigate("/student1_1");
  } else if (username === "Kishore K" && password === "pass2") {
    navigate("/student2_1");
  } else if (username === "Sangeeth M" && password === "pass3") {
    navigate("/student3_1");
  } else if (username === "Karthikeyan JV" && password === "pass4") {
    navigate("/student4_1");
  } else if (username === "Henry M" && password === "pass5") {
    navigate("/student5_1");
  } else if (username === "admin" && password === "adminpass") {
    navigate("/admin1");
  } else if (username === "faculty1" && password === "pass-1") {
    setFacultyName("faculty1"); // ✅ Set Zustand state
    navigate("/logger");
  } else if (username === "faculty2" && password === "pass-2") {
    setFacultyName("faculty2");
    navigate("/logger2");
  } else if (username === "faculty3" && password === "pass-3") {
    setFacultyName("faculty3");
    navigate("/logger3");
  } else if (username === "support" && password === "support-1") {
    navigate("/supportdesk");
  } else {
    alert("Invalid Credentials!");
  }
};

// ✅ Google Sign-In logic (unchanged)
export const handleGoogleLogin = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Google User:", user);

    if (user.email === "manoranjanm.ad24@bitsathy.ac.in") {
      navigate("/student1_1");
    } else if (user.email === "manomurugesh2007@gmail.com") {
      navigate("/admin1");
    } else {
      alert("Access Denied! Only authorized users can log in.");
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In failed. Please try again.");
  }
};
