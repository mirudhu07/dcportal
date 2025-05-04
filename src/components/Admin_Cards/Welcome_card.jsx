import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const Welcome_Card = () => {
  const boxCommonStyle = {
    padding: "8px 12px",
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontSize: "1.3rem",
    fontWeight: 500,
    display: "inline-block",
    marginBottom: "10px",
    color: "#000",
  };

  return (
    <>
      <Card
        sx={{
          width: "30vw",
          margin: "0 auto",
          padding: 2,
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #D9D4D4",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Tahoma",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              fontFamily: "sans-serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#555555",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            OVERVIEW
          </Typography>
        </Grid>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box sx={{ ...boxCommonStyle, backgroundColor: "#FFE5B4" }}>
            Total Complaints: 8
          </Box>

          <Box sx={{ ...boxCommonStyle, backgroundColor: "#FFD6D6" }}>
            Pending: 3
          </Box>

          <Box sx={{ ...boxCommonStyle, backgroundColor: "#D6FFD6" }}>
            Resolved: 5
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Welcome_Card;