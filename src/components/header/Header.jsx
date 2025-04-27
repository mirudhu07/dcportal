 import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const collapsed = true; 

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#F0F0F0",
        boxShadow: "none",
        padding: "10px 20px",
        width: `calc(100% - ${collapsed ? "100px" : "290px"})`, // FIXED
        left: collapsed ? "100px" : "290px",
        transition: "width 0.3s ease, left 0.3s ease",
        height: "85px"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ color: "black", fontWeight: "semi-bold", fontSize: "26px" }}>
          DC Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
 