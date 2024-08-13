import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import config from "../config/config";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export default function SetTaskPropertyDialog({
  task,
  currentProperties,
  open,
  onClose,
}) {
  const [propertyName, setPropertyName] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleInputChange = (event) => {
    setPropertyName(event.target.value);
    setError("");
  };

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const token = storedData ? storedData.token : null;

  const handleClose = () => {
    setPropertyName(""); // Reset values to their initial state
    setError("");
    setShowAlert(false);
    onClose(); // Close the dialog
  };

  const handleSave = async () => {
    if (propertyName.trim() === "") {
      setError("The field is required");
      return; // Prevent further execution if empty
    }

    const propertyLower = propertyName.toLowerCase();

    // Find the tuple where the name matches the propertyLower
    const matchedProperty = currentProperties.find(
      ([name, id]) => name.toLowerCase() === propertyLower,
    );

    if (matchedProperty) {
      const [, propertyId] = matchedProperty; // Destructure to get the property id

      const apiUrl = `${config.API_BASE_URL}/task_properties/`;
      const body = {
        task: task.id,
        property: propertyId, // Use the matched property ID
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // Serialize the body as JSON
        });

        if (response.ok) {
          setAlertSeverity("success");
          setAlertMessage("Task linked to the given property successfully!");
          setShowAlert(true);
        } else {
          setError("Error in setting up the task properties.");
        }
      } catch (error) {
        setError("Error in setting up the task properties.");
      }
    } else {
      setError(
        `Property "${propertyName}" does not exist. Please create it first!`,
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {showAlert && (
        <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}
      <DialogTitle>Set Up Task Property</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Property Name"
          type="text"
          required
          variant="standard"
          fullWidth
          value={propertyName}
          onChange={handleInputChange}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SetTaskPropertyDialog.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  currentProperties: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
