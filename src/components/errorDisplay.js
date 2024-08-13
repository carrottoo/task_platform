import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function ErrorDisplay({ errorMessage, onRetry }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <ErrorIcon color="error" style={{ fontSize: 50 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {errorMessage}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          style={{ marginTop: 20 }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
}
