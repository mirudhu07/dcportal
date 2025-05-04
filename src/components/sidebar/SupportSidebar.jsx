import React, { useState } from "react";

const SupportSidebar = ({ onSelect, setCollapsed }) => {
  const [collapsedState, setCollapsedState] = useState(false);
  const [activeItem, setActiveItem] = useState("supportDesk");

  const toggleSidebar = () => {
    const newState = !collapsedState;
    setCollapsedState(newState);
    setCollapsed(newState); // Notify parent to shift content
  };

  const sidebarBg = "#ffffff";

  return (
    <div
      className="d-flex flex-column vh-100 p-3"
      style={{
        backgroundColor: sidebarBg,
        width: collapsedState ? "80px" : "250px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        transition: "width 0.3s ease",
        zIndex: 1000,
      }}
    >
      {/* Toggle Button */}
      <button
        className="btn mb-4"
        onClick={toggleSidebar}
        style={{
          border: "none",
          background: "none",
          outline: "none",
          display: "flex",
          justifyContent: collapsedState ? "center" : "flex-start",
          paddingLeft: collapsedState ? "0" : "8px",
        }}
      >
        <i
          className="bi bi-list fs-4"
          style={{
            color: collapsedState ? "#007bff" : "#000000",
            transition: "transform 0.3s ease, color 0.3s ease",
            transform: collapsedState ? "rotate(180deg)" : "rotate(0deg)",
          }}
        ></i>
      </button>

      {/* Menu Items */}
      <ul className="nav flex-column">
        <SidebarItem
          icon="bi bi-collection-play"
          label="Support Desk"
          collapsed={collapsedState}
          isActive={activeItem === "supportDesk"}
          onClick={() => {
            setActiveItem("supportDesk");
            onSelect("supportDesk");
          }}
        />
        <SidebarItem
          icon="bi bi-box-arrow-left"
          label="Logout"
          collapsed={collapsedState}
          isActive={activeItem === "logout"}
          onClick={() => {
            setActiveItem("logout");
            window.location.href = "/";
          }}
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, onClick, isActive }) => {
  return (
    <li
      className="nav-item mb-3"
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        backgroundColor: isActive ? "#e9f3ff" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <i
        className={`${icon} fs-5`}
        style={{ color: isActive ? "#007bff" : "#000000" }}
      ></i>
      {!collapsed && (
        <span
          className="ms-3"
          style={{ color: "#000000", fontWeight: isActive ? "600" : "normal" }}
        >
          {label}
        </span>
      )}
    </li>
  );
};

export default SupportSidebar;
