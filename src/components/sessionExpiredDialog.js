import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

const SessionExpiredDialog = ({ open, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignIn = () => {
    onClose(); // Optionally close the dialog first
    navigate("/signin"); // Redirect to the sign-in page using navigate
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your session has expired. Please click Sign In to log in again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignIn}>Sign In</Button>
      </DialogActions>
    </Dialog>
  );
};

SessionExpiredDialog.propTypes = {
  open: PropTypes.bool.isRequired, // open is a required boolean
  onClose: PropTypes.func.isRequired, // onClose is a required function
};

export default SessionExpiredDialog;
