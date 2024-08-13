import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, Link } from "react-router-dom";
import config from "../config/config";
import PropTypes from "prop-types";

function AddTag(props) {
  //const [open, setOpen] = useState(false);
  //console.log("here" + props.open)

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const token = storedData ? storedData.token : null;

  const handleChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setNameError("");
    setShowAlert(false);
  };

  const handleClose = () => {
    setName("");
    setNameError("");
    setShowAlert(false);
    props.setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      console.error("No token found");
      setAlertMessage(
        "Your session has expired, please click here to sign in.",
      );
      setShowAlert(true);
      return;
    }

    if (!name.trim()) {
      setNameError({ message: "Property name is required." });
      return;
    }

    const apiUrl = config.API_BASE_URL + "/properties/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setAlertSeverity("success");
        setAlertMessage("Property tag created successfully!");
        setShowAlert(true);

        setTimeout(() => {
          props.setOpen(false);
          navigate(0); // Reload the current page
        }, 500);
      } else {
        if (response.status === 401 || response.status === 403) {
          setAlertMessage("Session expired, please click here to sign in.");
          setShowAlert(true);
          return;
        }
        const responseErrors = data.errors;
        setNameError(responseErrors);
      }
    } catch (error) {
      console.error("Property tag creation failed:", error);
      const errorMessage =
        error.message || "Failed to create the property tag, please try again.";
      setAlertMessage(errorMessage);
      setShowAlert(true);
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {showAlert && (
        <Alert
          severity={alertSeverity}
          onClose={() => setShowAlert(false)}
          // style={{ position: 'absolute', top: '20', left: '50', zIndex: 2 }}
        >
          {/* {alertMessage} */}
          {alertMessage.split(" ").map(
            (
              word,
              index, // Split the message into words
            ) => (
              <span key={index}>
                {word === "here" ? <Link to="/signin">here</Link> : word}{" "}
                {/* Add spaces between words */}
              </span>
            ),
          )}
        </Alert>
      )}
      <DialogTitle> Create New Task Property Tag</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Property Name"
          type="text"
          fullWidth
          required
          variant="standard"
          value={name}
          error={nameError}
          helperText={
            nameError ? nameError.message || nameError["name"].message : ""
          }
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

AddTag.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddTag;
