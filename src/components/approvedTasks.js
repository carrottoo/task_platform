import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, TableCell, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,Button} from "@mui/material";
import config from "../config/config";
import callApi from "./utils";
import { formatTaskData } from "./utils";
import { taskMapping } from "./mapping";
import EnhancedTable from "./enhancedTable";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DetailsDialog from "./detailsDialog";
import SessionExpiredDialog from "./sessionExpiredDialog";


const headCells = [
  { id: 'displayId', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Task Name' },
  { id: 'assignee', numeric: false, disablePadding: false, label: 'Assignee'},
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'submittedOn', numeric: false, disablePadding: false, label: 'Submitted On' },
  { id: 'approvedOn', numeric: false, disablePadding: false, label: 'Approved on' },
  { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' },
  // Add more columns as needed
];

const cellContents = (row, labelId, hideIdColumn) => (
  <>
    {!hideIdColumn && (
      <TableCell component="th" id={labelId} scope="row" padding="normal">
        {row.displayId}
      </TableCell>
    )}
    <TableCell padding="normal">{row.name}</TableCell>
    <TableCell padding="normal">{row.assignee}</TableCell>
    <TableCell padding="normal">{row.status}</TableCell>
    <TableCell padding="normal">{row.submittedOn}</TableCell>
    <TableCell padding="normal">{row.approvedOn}</TableCell>
    <TableCell padding="normal">{row.createdOn}</TableCell>
    {/* Add more TableCell components for other fields */}
  </>
);


function ApprovedTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
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

        const filteredTasks = taskData.filter(task => task.assignee !== null && task.is_approved && task.status === 'Done');
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

  if (tasks.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography sx={{fontSize: 22}}>No tasks have been completed successfully yet by users</Typography>
      </Box>
    );
  }

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ marginLeft: '80px', marginRight: '80px', marginTop: '130px' }}>
        <EnhancedTable
          rows={tasks}
          headCells={headCells}
          cellContents={cellContents}
          heading="Tasks to Review"
          hideIdColumn={true} // Pass the prop to hide the ID column
          renderActions={renderActions}
          selectable={true} // Pass the prop to enable/disable checkboxes
        />
        {selectedTask && <DetailsDialog task={selectedTask} open={openDialog} onClose={handleCloseDialog} title='Task Details' />}
      </Box>
      <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleSessionExpiredDialogClose} />
    </Box>
  );
}

export default ApprovedTasks;