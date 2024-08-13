import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Typography from "@mui/material/Typography";
// import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function Header(props) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button variant="text" size="small" startIcon={<DashboardIcon />}>
          Dashboard
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1,
            fontFamily: "Josefin Sans",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            reloadDocument
            to="/signin"
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            size="small"
            component={Link}
            reloadDocument
            to="/signup"
          >
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
