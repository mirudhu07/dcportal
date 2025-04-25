 import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import SupportSidebar from "./components/sidebar/SupportSidebar";
import Forward from "./pages/Faculty/Forward"
import Logger from "./pages/Faculty/Logger";
import Mentor from "./pages/Faculty/Mentor";
import Revoke from "./pages/Faculty/Revoke";
import SupportDesk from "./pages/Supportdesk/SupportDesk";

const App = () => {
  const [role, setRole] = useState("faculty"); // "faculty" or "support"
  const [selectedPage, setSelectedPage] = useState("");

  const facultyPages = {
    logger: <Logger />,
    mentor: <Mentor />,
    revoke: <Revoke />,
    forward: <Forward />,
  };

  const supportPages = {
    supportDesk: <SupportDesk />,
  };

  const renderPage = () => {
    if (role === "faculty") return facultyPages[selectedPage] || <h2>Select a faculty option</h2>;
    if (role === "support") return supportPages[selectedPage] || <h2>Select a support option</h2>;
    return null;
  };

   return (
    <div>
      
      <div style={{ padding: "10px", display: "flex", gap: "10px", background: "#eee" }}>
        <button onClick={() => setRole("faculty")}>Faculty</button>
        <button onClick={() => setRole("support")}>Support Desk</button>
      </div>

      
      <div style={{ display: "flex" }}>
        {role === "faculty" ? (
          <Sidebar onSelect={setSelectedPage} />
        ) : (
          <SupportSidebar onSelect={setSelectedPage} />
        )}
        <div style={{ flex: 1, padding: "20px" }}>{renderPage()}</div>
      </div>
    </div>
  );
}; 

export default App;
 
