import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LogoutIcon from "@mui/icons-material/Logout";

const SupportSidebar = ({ onSelect }) => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        paddingTop: "20px",
      }}
    >
      <List>
        <ListItem button onClick={() => onSelect("supportDesk")}>
          <ListItemIcon>
            <VideoLibraryIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Upload Video" /> */}
        </ListItem>

        <ListItem button onClick={() => window.location.reload()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Logout" /> */}
        </ListItem>
      </List>
    </Box>
  );
};

export default SupportSidebar;
