import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, TableCell, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,Button} from "@mui/material";
import config from "../config/config";
import callApi from "./utils";
import { formatTaskData } from "./utils";
import { taskMapping } from "./mapping";
import EnhancedTable from "./enhancedTable";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import PublishIcon from '@mui/icons-material/Publish';
import InfoIcon from '@mui/icons-material/Info';
import DetailsDialog from "./detailsDialog";
import SessionExpiredDialog from "./sessionExpiredDialog";


const headCells = [
  { id: 'displayId', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Task Name' },
  { id: 'assignee', numeric: false, disablePadding: false, label: 'Assignee'},
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'updatedOn', numeric: false, disablePadding: false, label: 'Updated on' },
  { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' }
  // Add more columns as needed
];

const cellContents = (row, labelId, hideIdColumn) => (
  <>
    {!hideIdColumn && (
      <TableCell component="th" id={labelId} scope="row" padding="normal" align="center">
        {row.displayId}
      </TableCell>
    )}
    <TableCell align="center" padding="normal">{row.name}</TableCell>
    <TableCell align="center" padding="normal">{row.assignee}</TableCell>
    <TableCell align="center" padding="normal">{row.status}</TableCell>
    <TableCell align="center" padding="normal">{row.updatedOn}</TableCell>
    <TableCell align="center" padding="normal">{row.createdOn}</TableCell>
  </>
);


function AssignedTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;
  const userID = storedData ? storedData.userID : null;

  const [tasks, setTasks] = useState([]);
  const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const apiUrl = config.API_BASE_URL + "/tasks/";

      try {
        const result = await callApi(apiUrl);

        if (result.error?.toLowerCase().includes("Session expired")) {
          setSessionExpiredOpen(true);
          return;
        }

        if (result.error) {
          setError("Unable to fetch task data");
          return;
        }

        const taskData = result.ok.results || [];
    
        let filteredTasks; 

        if (userProfile === 'employer') {
            filteredTasks = taskData.filter(task => task.assignee !== null && task.status === 'In progress');
        } else {
            filteredTasks = taskData.filter(task => task.assignee === userID && tasks.status === 'In ');
        }

        const formattedTasks =  formatTaskData(filteredTasks, taskMapping);
        setTasks(formattedTasks);

      } catch (error) {
        setError(error.message || "Unable to fetch task data");

      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchTasks();
    }
  }, [userID]);

  const handleDetail = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSessionExpiredDialogClose = () =>{
    setSessionExpiredOpen(false);
  }

  const renderActions = (row) => (
    <>
      <Tooltip title="Details">
        <IconButton onClick={() => handleDetail(row)}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderEmployeeActions = (row) => (
    <>
    <Tooltip title="Details">
      <IconButton onClick={() => handleDetail(row)}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Unassign">
      <IconButton onClick={() => handleDetail(row)}>
        <CancelIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Submit">
      <IconButton onClick={() => handleDetail(row)}>
        <PublishIcon />
      </IconButton>
    </Tooltip>
    </>
  )

  if (tasks.length === 0) {
    if (userProfile === 'employer'){
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <Typography sx={{fontSize: 22}}>None of your tasks has been taken by other users</Typography>
        </Box>
      )
    }else{
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <Typography sx={{fontSize: 22}}>You haven't picked up any task yet</Typography>
        </Box>
      )

    }
  }

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  if (userProfile === 'employer'){
    return (
      <Box>
        <Box sx={{ marginLeft: '80px', marginRight: '80px', marginTop: '130px' }}>
          <EnhancedTable
            rows={tasks}
            headCells={headCells}
            cellContents={cellContents}
            heading="Assigned Tasks"
            hideIdColumn={true} // Pass the prop to hide the ID column
            renderActions={renderActions}
            selectable={true} // Pass the prop to enable/disable checkboxes
          />
          {selectedTask && <DetailsDialog task={selectedTask} open={openDialog} onClose={handleCloseDialog} title='Task Details' />}
        </Box>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleSessionExpiredDialogClose} />
      </Box>  
    )
  }else{
    return (
      <Box>
        <Box sx={{ marginLeft: '80px', marginRight: '80px', marginTop: '130px' }}>
          <EnhancedTable
            rows={tasks}
            headCells={headCells}
            cellContents={cellContents}
            heading="Assigned Tasks"
            hideIdColumn={true} // Pass the prop to hide the ID column
            renderActions={renderEmployeeActions}
            selectable={false} // Pass the prop to enable/disable checkboxes
          />
          {selectedTask && <DetailsDialog task={selectedTask} open={openDialog} onClose={handleCloseDialog} title='Task Details' />}
        </Box>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleSessionExpiredDialogClose} />
      </Box>
      )
  }
}

export default AssignedTasks;