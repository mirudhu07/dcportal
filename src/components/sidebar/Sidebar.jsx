import React from "react";
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

export default Sidebar;
