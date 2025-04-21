import React, { useState } from "react";
import Sidebar from "../src/components/sidebar/Sidebar";
import Logger from "../src/pages/Faculty/Logger";
import Mentor from "../src/pages/Faculty/Mentor";
import Revoke from "../src/pages/Faculty/Revoke";

const FacultyDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const renderPage = () => {
    switch (selectedPage) {
      case "logger":
        return <Logger />;
      case "mentor":
        return <Mentor />;
      case "revoke":
        return <Revoke />;
      /* default:
        return <h2>Select an option from the sidebar</h2>; */
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setSelectedPage} />
      <div style={{ flex: 1, padding: "20px" }}>{renderPage()}</div>
    </div>
  );
};

export default FacultyDashboard;
