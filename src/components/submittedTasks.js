import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, TableCell, Tooltip} from "@mui/material";
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
    { id: 'submittedOn', numeric: false, disablePadding: false, label: 'Submitted on' },
    { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' },
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
    <TableCell padding="normal">{row.createdOn}</TableCell>
    </>
);



export default function SubmittedTasks(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userID = storedData ? storedData.userID : null;
    const userProfile = storedData ? storedData.profile : null;
    
    const [tasks, setTasks] = useState([]);
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect( () => {
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
                }else{
                    filteredTasks = taskData.filter(task => task.assignee === userID && task.is_submitted && task.status === 'In review');

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

    }, [userID, userProfile])

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

    const renderActions = (row) => {
        if (userProfile === 'employer') {
            return (
                <>
                    <Tooltip title="Details">
                        <IconButton onClick={() => handleDetail(row)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Approve">
                        <IconButton onClick={() => handleDetail(row)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </>
            );
        } else { 
            return (
                <>
                    <Tooltip title="details">
                        <IconButton onClick={() => handleDetail(row)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </>
            );
        }
    };

    if (tasks.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                <Typography sx={{ fontSize: 22 }}>
                    {userProfile === 'employer' ? "No tasks to be reviewed" : "You haven't submitted any tasks"}
                </Typography>
            </Box>
        );
    }

    if (loading) return <CircularProgress />;

    if (error) return <Typography color="error">{error}</Typography>;

    let heading;

    if (userProfile === 'employer'){
        heading = "Tasks to Review";
    }else{
        heading = "Submitted Tasks"; 
    }

    return (
        <Box>
          <Box sx={{ marginLeft: '80px', marginRight: '80px', marginTop: '130px' }}>
            <EnhancedTable
              rows={tasks}
              headCells={headCells}
              cellContents={cellContents}
              heading= {heading}
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