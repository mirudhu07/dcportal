/*  import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Tooltip, // Tooltip added
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BlockIcon from "@mui/icons-material/Block";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import "../../styles/sidebar.css";

const Sidebar = ({ onSelect }) => {
  const menuItems = [
    { text: "Logger", icon: <AssignmentIcon />, page: "logger" },
    { text: "Mentor", icon: <SupervisorAccountIcon />, page: "mentor" },
    { text: "Revoke", icon: <BlockIcon />, page: "revoke" },
    { text: "Forward", icon: <ForwardToInboxIcon />, page: "forward" },
    { text: "Logout", icon: <ExitToAppIcon />, page: "logout" },
  ];

  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={item.text} placement="right">
            <ListItem button onClick={() => onSelect(item.page)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; */
 
 import { useState } from "react";

const Sidebar = ({ onSelect }) => {
  const [collapsed] = useState(true);

  return (
    <div
      className="d-flex flex-column text-white vh-100 p-3"
      style={{
        backgroundColor: "black",
        width: collapsed ? "100px" : "290px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
      }}
    >
      <button
        className="btn btn-outline-light mb-3"
        style={{ marginTop: "8px" }}
      >
        <i className="bi bi-list-ul fs-4"></i>
      </button>

      <div style={{ marginTop: "40px" }}>
        <ul className="nav flex-column fs-5 mt-5">
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-journal-text" label="Logger" collapsed={collapsed} onClick={() => onSelect("logger")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi-people" label="Mentor" collapsed={collapsed} onClick={() => onSelect("mentor")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi-slash-circle" label="Revoke" collapsed={collapsed} onClick={() => onSelect("revoke")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi bi-send-fill" label="Forward" collapsed={collapsed} onClick={() => onSelect("forward")} />
          </div>
          <div className="my-3 mx-1" style={{ fontFamily: "Tahoma" }}>
            <SidebarItem icon="bi-box-arrow-left" label="Logout" collapsed={collapsed} onClick={() => onSelect("")} />
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
        <i className={`bi ${icon} fs-5`}></i>
        {!collapsed && <span className="ms-3">{label}</span>}
      </div>
    </li>
  );
};

export default Sidebar; 

