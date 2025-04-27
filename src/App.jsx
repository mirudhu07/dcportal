import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import SupportSidebar from "./components/sidebar/SupportSidebar";
 import Header from "./components/header/Header"; 
import Forward from "./pages/Faculty/Forward";
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
      {/* Top role selection buttons */}
      <div style={{ padding: "10px", display: "flex", gap: "10px", background: "#eee" }}>
        <button onClick={() => setRole("faculty")}>Faculty</button>
        <button onClick={() => setRole("support")}>Support Desk</button>
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        {role === "faculty" ? (
          <Sidebar onSelect={setSelectedPage} />
        ) : (
          <SupportSidebar onSelect={setSelectedPage} />
        )}

        {/* Content Area */}
         <div style={{ flex: 1, marginLeft: "100px" }}> 
          <Header /> 
          <div style={{ padding: "20px", marginTop: "85px" }}>
            {renderPage()}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default App;
