import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Login = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role || !username) return alert("Please fill all fields");

    // Simulate login - you can replace with real API
    if (role === "faculty") navigate("/faculty");
    else if (role === "supportdesk") navigate("/supportdesk");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4">Login Page</Typography>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
          <MenuItem value="faculty">Faculty</MenuItem>
          <MenuItem value="supportdesk">Support Desk</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
