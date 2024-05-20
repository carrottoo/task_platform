import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, TableCell } from "@mui/material";
import config from "../config/config";
import callApi from "./utils";
import { taskMapping } from "./mapping";
import EnhancedTable from "./enhancedTable";

const headCells = [
  { id: 'displayId', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Task Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'updatedOn', numeric: false, disablePadding: false, label: 'Updated on' },
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
    <TableCell padding="normal">{row.description}</TableCell>
    <TableCell padding="normal">{row.status}</TableCell>
    <TableCell padding="normal">{row.updatedOn}</TableCell>
    <TableCell padding="normal">{row.createdOn}</TableCell>
    {/* Add more TableCell components for other fields */}
  </>
);

function CreatedTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userID = storedData ? storedData.userID : null;

  const [tasks, setTasks] = useState([]);
  const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError("Unable to fetch user data");
          return;
        }

        const taskData = result.ok.results || [];

        const formattedTasks = taskData.map((task, index) => {
          const formattedTask = {};
          for (const frontendField in taskMapping) {
            const backendField = taskMapping[frontendField];
            formattedTask[frontendField] = task[backendField] || "";
          }

          formattedTask.createdOn = new Date(task.created_on).toLocaleDateString();
          formattedTask.updatedOn = new Date(task.updated_on).toLocaleDateString();
          formattedTask.id = task.id; // Use backend id for internal purposes
          formattedTask.displayId = index + 1; // Use index for display purposes

          return formattedTask;
        });

        setTasks(formattedTasks);
      } catch (error) {
        setError(error.message || "Unable to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchTasks();
    }
  }, [userID]);

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ marginLeft: '80px', marginRight: '80px', marginTop: '130px' }}>
        <EnhancedTable
          rows={tasks}
          headCells={headCells}
          cellContents={cellContents}
          heading="Created Tasks"
          hideIdColumn={true} // Pass the prop to hide the ID column
        />
      </Box>
    </Box>
  );
}

export default CreatedTasks;


