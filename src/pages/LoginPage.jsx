
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { handleLogin, handleGoogleLogin } from "../components/functionality";
import "../styles/loginpage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Box className="login-container">
        <Typography variant="h4" className="login-title">
          Welcome Back!
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{marginTop: "20px"}}

        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          className="login-button"
          onClick={() => handleLogin(username, password, navigate)}
        >
          LOGIN
        </Button>
        <p style={{ fontFamily: "tahoma", fontSize: "20px", marginTop: "18px" }}>
          or
        </p>
        <button
          className="google-sign-in"
          type="button"
          style={{ borderRadius: "20px", fontFamily: "tahoma", padding: "10px", backgroundColor: 'white' }}
          onClick={() => handleGoogleLogin(navigate)}
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google logo"
            style={{ marginRight: "8px" }}
          />
          Sign in with Google
        </button>
      </Box>
    </div>
  );
};

export default LoginPage;