import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../assets/background.JPG";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import config from "../config/config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";

function SignUp() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error"); // Assuming 'error' for failed signup

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: "" });
    setShowAlert(false);
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {
        username,
        email,
        confirmEmail,
        password,
        confirmPassword,
        firstName,
        lastName,
      } = values;

      if (email !== confirmEmail || password !== confirmPassword) {
        setSnackbarMessage("Failed to sign up, please try again.");
        setOpenSnackbar(true);

        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmEmail: email !== confirmEmail ? "Emails do not match." : "",
          confirmPassword:
            password !== confirmPassword ? "Passwords do not match." : "",
        }));

        return; // Prevent further execution if there are errors
      }

      const apiUrl = config.API_BASE_URL + "/users/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        console.log(data.id);
        setAlertSeverity("success");
        setAlertMessage("Signup successful! Click here to  Sign in.");
        setShowAlert(true);

        // Clear the form
        setValues({
          username: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        });
      } else {
        const responseErrors = data.errors;
        const errorCount = data.error_count;

        if (errorCount !== 1) {
          const combinedErrors = {};
          for (const field in responseErrors) {
            combinedErrors[field] = responseErrors[field]
              .map((error) => error.message)
              .join(" "); // Join with '. '
          }
          console.log("this is called");
          setErrors(combinedErrors);
        } else {
          setErrors(responseErrors);
        }
        console.log(errors["password"]);
        setSnackbarMessage("Failed to sign up, please try again."); // Or use errorData.message
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      const errorMessage =
        error.message || "Failed to sign up, please try again.";
      setAlertMessage(errorMessage);
      setShowAlert(true);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ p: 2, mb: 3 }}>
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
                        {word === "here" ? (
                          <Link to="/signin" className="link">
                            here
                          </Link>
                        ) : (
                          word
                        )}{" "}
                        {/* Add spaces between words */}
                      </span>
                    ),
                  )}
                </Alert>
              )}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: "calc(16px + 0.5vmin)",
                    color: "#0077cc",
                    textAlign: "left",
                    fontWeight: "bold",
                    mb: 4,
                  }}
                >
                  Your Task Management Helper
                  <TaskAltIcon sx={{ ml: 3 }} />
                </Typography>
              </Stack>
              <Typography
                color="text.secondary"
                variant="body2"
                s={{ fontSize: "calc(10px + 0.5vmin)" }}
              >
                Register as a new user to our task service platform to
                facilitate your task outsourcing and co-working
              </Typography>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={4000} // Adjust duration as needed
                onClose={() => setOpenSnackbar(false)}
              >
                <MuiAlert
                  severity="error"
                  onClose={() => setOpenSnackbar(false)}
                >
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
              <Divider />
            </Box>
            <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    label="First name"
                    autoComplete="firstName"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    label="Last name"
                    autoComplete="lastName"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange("username")}
                    // This will be true if 'username' is present and it is not ''
                    error={errors["username"]}
                    helperText={
                      errors["username"]
                        ? errors["username"].message || errors["username"]
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={errors["email"]}
                    helperText={
                      errors["email"]
                        ? errors["email"].message || errors["email"]
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Confirm Email Address"
                    autoComplete="email"
                    value={values.confirmEmail}
                    onChange={handleChange("confirmEmail")}
                    error={errors["confirmEmail"]}
                    helperText={
                      errors["confirmEmail"]
                        ? errors["confirmEmail"].message ||
                          errors["confirmEmail"]
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    error={errors["password"]}
                    helperText={
                      errors["password"]
                        ? errors["password"].message || errors["password"]
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    error={errors["confirmPassword"]}
                    helperText={
                      errors["confirmPassword"]
                        ? errors["confirmPassword"].message ||
                          errors["confirmPassword"]
                        : ""
                    }
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Switch
                    checked={isEmployer}
                    onChange={() => setIsEmployer(!isEmployer)}
                    name="isEmployer"
                    color="primary"  
                    />
                }
                    label= "Are you a employer"
                    style={{ marginLeft: 0, display: 'flex', alignItems: 'center' }} 
                />
                </Grid> */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ marginTop: "16px", textAlign: "center" }}
                  >
                    Already have an account?
                    <Link
                      reloadDocument
                      to="/signin"
                      style={{ marginLeft: "5px" }}
                      className="link"
                    >
                      Sign in here
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ marginTop: "16px", textAlign: "center" }}
                  >
                    Back to
                    <Link
                      reloadDocument
                      to="/"
                      style={{ marginLeft: "5px" }}
                      className="link"
                    >
                      Homepage
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;
