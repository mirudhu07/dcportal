import React, { useState } from "react";

const SupportSidebar = ({ onSelect }) => {
  const [collapsed] = useState(true); // static for now, just like you did

  return (
    <div
      className="d-flex flex-column text-white vh-100 p-3"
      style={{
        backgroundColor: "black",
        width: collapsed ? "100px" : "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
      }}
    >
      {/* Toggle button (optional, non-functional now) */}
      <button
        className="btn btn-outline-light mb-3"
        style={{ marginTop: "8px" }}
      >
        <i className="bi bi-list-ul fs-4"></i>
      </button>

      {/* Menu Items */}
      <div style={{ marginTop: "40px" }}>
        <ul className="nav flex-column fs-5 mt-5">
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem
              icon="bi bi-collection-play"
              label="Support Desk"
              collapsed={collapsed}
              onClick={() => onSelect("supportDesk")}
            />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem
              icon="bi bi-box-arrow-left"
              label="Logout"
              collapsed={collapsed}
              onClick={() => window.location.reload()}
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, onClick }) => {
  return (
    <li className="nav-item" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="nav-link d-flex align-items-center text-light">
        <i className={`${icon} fs-5`}></i>
        {!collapsed && <span className="ms-3">{label}</span>}
      </div>
    </li>
  );
};

export default SupportSidebar;
