import * as React from "react";
import { AppBar } from "./appBar";
import { Drawer } from "./drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  MainListItems,
  SecondaryListItems,
  MainListItemsEmployee,
  SecondaryListItemsEmployee,
} from "./drawerItems";
import Tooltip from "@mui/material/Tooltip";
import AddTask from "./addTask";
import AddTag from "./addTag";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const handleLogout = () => {
  // Clear the stored token
  localStorage.removeItem("userData");
  // Redirect user or update the state to reflect logged out status
  window.location.href = "/signin";
};

export default function Dashboard({ children }) {
  const [open_task, setOpenTask] = React.useState(false);
  const [open_drawer, setOpenDrawer] = React.useState(false);
  const [open_tag, setOpenTag] = React.useState(false);

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;

  const toggleDrawer = () => {
    setOpenDrawer(!open_drawer);
  };

  const handleClickOpen = () => {
    console.log("hello");
    console.log(open_task);
    setOpenTask(true);
    console.log(open_task);
  };

  const handleClickOpenTag = () => {
    setOpenTag(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open_drawer}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open_drawer && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Tooltip title="Back to Dashboard" placement="bottom-start">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <Link
                  to={userProfile === "employee" ? "/employee" : "/employer"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Dashboard
                </Link>
              </Typography>
            </Tooltip>
            {userProfile && userProfile === "employer" && (
              <Tooltip title="Create New Task">
                <IconButton color="inherit" onClick={handleClickOpen}>
                  <Badge color="secondary">
                    <AddTaskIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            <AddTask open={open_task} setOpen={setOpenTask} />
            <Tooltip title="Create Property Tag">
              <IconButton color="inherit" onClick={handleClickOpenTag}>
                <Badge color="secondary">
                  <PostAddIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <AddTag open={open_tag} setOpen={setOpenTag} />
            <Tooltip title="Back to Homepage">
              <IconButton
                color="inherit"
                component={Link}
                reloadDocument
                to="/"
              >
                <Badge color="secondary">
                  <HomeIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign out">
              <IconButton color="inherit" onClick={handleLogout}>
                <Badge color="secondary">
                  <LogoutIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open_drawer}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {userProfile === "employer" ? (
              <>
                <MainListItems />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
              </>
            ) : (
              <>
                <MainListItemsEmployee />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItemsEmployee />
              </>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
