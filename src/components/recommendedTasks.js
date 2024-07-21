import { useEffect, useState } from "react";
import * as React from 'react';
import config from "../config/config";
import { Snackbar, Button, Grid, Alert, Typography, Box} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { RecommendationCard } from "./recommendationCard";
import SessionExpiredDialog from './sessionExpiredDialog';
import { useNavigate} from 'react-router-dom';
import { patchingTask } from "./apiService";

export const RecommendedTasks = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    const [recommendedTasks, setRecommendedTasks] = useState([]);
    // const [displayedTasks, setDisplayedTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const fetchRecommendedTasks = async (page) => {
        const url = `${config.API_BASE_URL}/tasks/recommend/?page=${page}&page_size=10`;

        if (!token) {
            console.error('No token found');
            setSessionExpiredOpen(true);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    setSessionExpiredOpen(true);
                    return;
                }
                setSnackbarMessage('Failed to load contents...');
                setOpenSnackbar(true);
                return;
            }

            const data = await response.json();
            console.log('Fetched tasks:', data);

            if (data && data.results && Array.isArray(data.results)) {
                const tasksWithDetails = await Promise.all(
                    data.results.map(async (task) => {
                        const details = await fetchTaskDetails(task.id, token);
                        return { ...task, ...details };
                    })
                );

                setRecommendedTasks(tasksWithDetails);
                // setDisplayedTasks(tasksWithDetails.slice(0, 10));
                setTotalPages(Math.ceil(data.count / 10)); 
            } else {
                console.error('Expected an array but got:', data);
                setSnackbarMessage('Unexpected response format.');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            setSnackbarMessage(error.message || 'Failed to load contents...');
            setOpenSnackbar(true);
        }
    };

    const fetchTaskDetails = async (taskId, token) => {
        const url = `${config.API_BASE_URL}/tasks/${taskId}/`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch task details:', response.statusText);
                return {};
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch task details:', error);
            return {};
        }
    };

    useEffect(() => {
        fetchRecommendedTasks(currentPage);
    }, [currentPage]);

    const handleAssign = async (taskId) => {
        const patchUrl = config.API_BASE_URL + "/tasks/" + taskId + '/';

        const body = {
            'assignee': storedData.userID
        }

        const field = 'assignee';
        const errorMessage = 'Error in assigning this task to yourself.';
        const successMessage = 'Task has been assigned to you successfully!';

        await patchingTask(
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
            navigate
        );
    };

    const handleRefresh = async () => { 
        let nextPage = currentPage + 1;
        if (nextPage > totalPages) {
            nextPage = 1; 
        }
        setCurrentPage(nextPage); 

        // Fetch data again with the updated page number
        await fetchRecommendedTasks(nextPage);
    };


    const handleDialogClose = () => {
        setSessionExpiredOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
            >
                <MuiAlert severity="error" onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            {showAlert && ( 
                <Alert 
                    severity={alertSeverity} 
                    onClose={() => setShowAlert(false)}
                    sx = {{
                        marginBottom: '20px'
                    }}
                >
                    {alertMessage}
                </Alert>
            )}
            <Box mt={3} mb={5}>
                <Typography sx={{fontWeight: 'bold'}}>
                    We think you would like these...
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {recommendedTasks.map(task => (
                    <Grid item xs={12} md={6} lg={4} key={task.id}>
                        <RecommendationCard task={task} handleAssign={handleAssign} />
                    </Grid>
                ))}
            </Grid>
            <Button sx= {{marginTop: 10}} onClick={handleRefresh} variant="contained"> 
                Refresh
            </Button>
            <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleDialogClose} />
        </React.Fragment>
    );
}

