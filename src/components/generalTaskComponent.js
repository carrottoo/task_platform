import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  CircularProgress,
  Typography,
  Tooltip,
  Alert,
} from "@mui/material";
import EnhancedTable from "./enhancedTable";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DetailsDialog from "./taskDetailsDialog";
import SessionExpiredDialog from "./sessionExpiredDialog";
import config from "../config/config";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PublishIcon from "@mui/icons-material/Publish";
import PentagonIcon from "@mui/icons-material/Pentagon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useNavigate } from "react-router-dom";
import {
  patchingTask,
  listRetrival,
  deleteObject,
  setLikeStatus,
  isTaskUnassigned,
} from "./apiService";
import callApi, { formatTaskData } from "./utils";
import { taskMapping } from "./mapping";
import SetTaskPropertyDialog from "./setTaskProperty";

export default function GeneralTaskComponent({
  headCells,
  cellContents,
  heading,
  noContentMessage,
  renderApprove = false,
  renderSubmit = false,
  renderUnassign = false,
  renderAssign = false,
  renderLike = false,
  renderDislike = false,
  renderSetProperty = false,
  filter = true,
  filterCriteria = null,
  selectable = true,
  isUserBehavior = false,
  fetchProperties = false,
}) {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userID = storedData ? storedData.userID : null;
  const token = storedData ? storedData.token : null;

  const [tasks, setTasks] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPropertyDialog, setOpenPropertyDialog] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [currentProperties, setCurrentProperties] = useState("");

  useEffect(() => {
    if (!isUserBehavior) {
      const fetchTasks = async () => {
        const apiUrl = `${config.API_BASE_URL}/tasks/`;
        const formattedTasks = await listRetrival(
          token,
          apiUrl,
          "task",
          setSessionExpiredOpen,
          setError,
          setLoading,
          filter,
          filterCriteria,
        );
        setTasks(formattedTasks);
      };

      if (userID) {
        fetchTasks();
      }
    }
  }, [userID, filter, filterCriteria, token, isUserBehavior]);

  useEffect(() => {
    if (fetchProperties) {
      const fetchProperties = async () => {
        const apiUrl = `${config.API_BASE_URL}/properties/`;
        try {
          const properties = await listRetrival(
            token,
            apiUrl,
            "property",
            sessionExpiredOpen,
            setError,
            setLoading,
            filterCriteria,
          );

          // Extract property names and ids as tuples and store them in currentProperties
          const propertyTuples = properties.map((property) => [
            property.name,
            property.id,
          ]);
          setCurrentProperties(propertyTuples);
        } catch (error) {
          setError(error.message || "Error in setting up the task property");
        }
      };

      if (userID) {
        fetchProperties();
      }
    }
  }, [userID, fetchProperties, filterCriteria, sessionExpiredOpen, token]);

  useEffect(() => {
    if (isUserBehavior) {
      const fetchUserBehaviors = async () => {
        const apiUrl = `${config.API_BASE_URL}/user_behaviors/`;
        const userBehaviors = await listRetrival(
          token,
          apiUrl,
          "user_behavior",
          sessionExpiredOpen,
          setError,
          setLoading,
          filter,
          filterCriteria,
        );

        console.log(userBehaviors);

        let correspondingTasks = [];
        let mappedBehaviors = {};

        for (const userBehavior of userBehaviors) {
          const url = `${config.API_BASE_URL}/tasks/${userBehavior.task}/`;

          try {
            const result = await callApi(token, url);

            if (result.error) {
              setError("Error fetching property tag details.");
              return;
            }

            correspondingTasks.push(result.ok);
            mappedBehaviors[result.ok.id] = userBehavior.id;
          } catch (error) {
            setError(error.message || "Error fetching property tag details.");
          }
        }
        console.log(correspondingTasks);
        setTasks(formatTaskData(correspondingTasks, taskMapping));
        setBehaviors(mappedBehaviors);
      };

      if (userID) {
        fetchUserBehaviors();
      }
    }
  }, [
    userID,
    filterCriteria,
    filter,
    sessionExpiredOpen,
    token,
    isUserBehavior,
  ]);

  const handleDetail = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const navigate = useNavigate();

  const handleDelete = async (selectedRows) => {
    for (let task of selectedRows) {
      const url = config.API_BASE_URL + "/tasks/";
      const alternativeErrorMessage = "Failed to delete the selected task.";
      const supplementPermissionMessage =
        "You cannot delete a task created by other users!";
      const successMessage = "The selected task has been deleted successfully!";

      await deleteObject(
        token,
        url,
        task.id,
        alternativeErrorMessage,
        supplementPermissionMessage,
        successMessage,
        setSessionExpiredOpen,
        setAlertMessage,
        setAlertSeverity,
        setShowAlert,
        navigate,
      );
    }
  };

  const handleUserBehaviorDelete = async (task) => {
    const userBehaviorId = behaviors[task.id];
    const url = config.API_BASE_URL + "/user_behaviors/";
    const alternativeErrorMessage = "Failed to delete the selected item.";
    const supplementPermissionMessage =
      "You cannot delete a preference over tasks created by other users!";
    const successMessage = "The selected item has been deleted successfully!";

    deleteObject(
      token,
      url,
      userBehaviorId,
      alternativeErrorMessage,
      supplementPermissionMessage,
      successMessage,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      navigate,
    );
  };

  const handleApprove = async (task) => {
    const patchUrl = config.API_BASE_URL + "/tasks/" + task.id + "/";
    const body = {
      is_approved: true,
    };

    const field = "is_approved";
    const errorMessage = "Error in approving this task.";
    const successMessage = "Task has been approved successfully!";

    patchingTask(
      patchUrl,
      token,
      body,
      field,
      errorMessage,
      successMessage,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      navigate,
    );
  };

  const handleAssign = async (task) => {
    const patchUrl = config.API_BASE_URL + "/tasks/" + task.id + "/";

    const body = {
      assignee: userID,
    };

    const field = "assignee";
    const errorMessage = "Error in assigning this task to yourself.";
    const successMessage = "Task has been assigned to you successfully!";

    patchingTask(
      patchUrl,
      token,
      body,
      field,
      errorMessage,
      successMessage,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      navigate,
    );
  };

  const handleUnassign = async (task) => {
    const unassigned = await isTaskUnassigned(token, task);

    if (unassigned) {
      setAlertMessage("Task has already been unassigned");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    const body = {
      assignee: null,
    };

    const patchUrl = config.API_BASE_URL + "/tasks/" + task.id + "/";

    const field = "assignee";
    const errorMessage = "Error in unassigning yourself from this task";
    const successMessage =
      "You have successfully unassigned yourself from this task";

    patchingTask(
      patchUrl,
      token,
      body,
      field,
      errorMessage,
      successMessage,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      navigate,
    );
  };

  const handleSubmit = async (task) => {
    const patchUrl = config.API_BASE_URL + "/tasks/" + task.id + "/";
    const body = {
      is_submitted: true,
    };

    const field = "is_submitted";
    const errorMessage = "Error in submitting this task.";
    const sucessMessage = "Task has been submitted successfully!";

    patchingTask(
      patchUrl,
      token,
      body,
      field,
      errorMessage,
      sucessMessage,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      navigate,
    );
  };

  const handleLike = async (task) => {
    const url = config.API_BASE_URL + "/user_behaviors/";

    const body = {
      user: userID,
      task: task.id,
      is_like: true,
    };

    const updateBody = {
      is_like: true,
    };

    setLikeStatus(
      token,
      url,
      task,
      body,
      updateBody,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
    );
  };

  const handleDislike = async (task) => {
    const url = config.API_BASE_URL + "/user_behaviors/";

    const body = {
      user: userID,
      task: task.id,
      is_like: false,
    };

    const updateBody = {
      is_like: false,
    };

    setLikeStatus(
      token,
      url,
      task,
      body,
      updateBody,
      setSessionExpiredOpen,
      setAlertMessage,
      setAlertSeverity,
      setShowAlert,
      false,
      false,
    );
  };

  const handleTagProperty = async (task) => {
    setSelectedTask(task);
    setOpenPropertyDialog(true);
  };

  const renderActions = (row) => {
    return (
      <>
        <Tooltip title="Details">
          <IconButton onClick={() => handleDetail(row)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        {renderApprove && (
          <Tooltip title="Approve">
            <IconButton onClick={() => handleApprove(row)}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderAssign && (
          <Tooltip title="Assign">
            <IconButton onClick={() => handleAssign(row)}>
              <PlaylistAddCheckIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderUnassign && (
          <Tooltip title="Unassign">
            <IconButton onClick={() => handleUnassign(row)}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderLike && (
          <Tooltip title="Like">
            <IconButton onClick={() => handleLike(row)}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderDislike && (
          <Tooltip title="Dislike">
            <IconButton onClick={() => handleDislike(row)}>
              <ThumbDownAltIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderSubmit && (
          <Tooltip title="Submit">
            <IconButton onClick={() => handleSubmit(row)}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
        )}
        {renderSetProperty && (
          <Tooltip title="Link taks property">
            <IconButton onClick={() => handleTagProperty(row)}>
              <PentagonIcon />
            </IconButton>
          </Tooltip>
        )}
        {isUserBehavior && (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleUserBehaviorDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClosePropertyDialog = () => {
    setOpenPropertyDialog(false);
  };

  const handleSessionExpiredDialogClose = () => {
    setSessionExpiredOpen(false);
  };

  if (tasks.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography sx={{ fontSize: 22 }}>{noContentMessage}</Typography>
      </Box>
    );
  }

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ marginLeft: "80px", marginRight: "80px", marginTop: "130px" }}>
        {showAlert && (
          <Alert
            severity={alertSeverity}
            onClose={() => setShowAlert(false)}
            sx={{
              marginBottom: "20px",
            }}
          >
            {alertMessage}
          </Alert>
        )}
        <EnhancedTable
          rows={tasks}
          headCells={headCells}
          cellContents={cellContents}
          heading={heading}
          hideIdColumn={true} // Pass the prop to hide the ID column
          renderActions={(row) => renderActions(row)}
          handleDelete={handleDelete}
          selectable={selectable} // Pass the prop to enable/disable checkboxes
        />
        {selectedTask && (
          <DetailsDialog
            task={selectedTask}
            open={openDialog}
            onClose={handleCloseDialog}
            title="Task Details"
          />
        )}
        {selectedTask && (
          <SetTaskPropertyDialog
            task={selectedTask}
            currentProperties={currentProperties}
            open={openPropertyDialog}
            onClose={handleClosePropertyDialog}
          ></SetTaskPropertyDialog>
        )}
      </Box>
      <SessionExpiredDialog
        open={sessionExpiredOpen}
        onClose={handleSessionExpiredDialogClose}
      />
    </Box>
  );
}

GeneralTaskComponent.propTypes = {
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      disablePadding: PropTypes.bool,
    }),
  ).isRequired, // An array of objects defining the columns for the table
  cellContents: PropTypes.func.isRequired, // A function to render the contents of each cell
  heading: PropTypes.string.isRequired, // A string representing the heading of the component
  noContentMessage: PropTypes.string.isRequired, // A string to display when there is no content
  renderApprove: PropTypes.bool, // A boolean to determine if the approve action should be rendered
  renderSubmit: PropTypes.bool, // A boolean to determine if the submit action should be rendered
  renderUnassign: PropTypes.bool, // A boolean to determine if the unassign action should be rendered
  renderAssign: PropTypes.bool, // A boolean to determine if the assign action should be rendered
  renderLike: PropTypes.bool, // A boolean to determine if the like action should be rendered
  renderDislike: PropTypes.bool, // A boolean to determine if the dislike action should be rendered
  renderSetProperty: PropTypes.bool, // A boolean to determine if the set property action should be rendered
  filter: PropTypes.bool, // A boolean to determine if filtering should be applied
  filterCriteria: PropTypes.object, // An object defining the criteria for filtering
  selectable: PropTypes.bool, // A boolean to determine if rows are selectable
  isUserBehavior: PropTypes.bool, // A boolean to determine if the component is handling user behaviors
  fetchProperties: PropTypes.bool, // A boolean to determine if properties should be fetched
};
