import React, { useEffect, useState }  from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import config from '../config/config';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SessionExpiredDialog from './sessionExpiredDialog';


const TaskCards = () =>{
    const [taskCount, setTaskCount] = useState(0); 
    const [assignedCount, setAssignedCount] = useState(0);
    const [unassignedCount, setUnassignedCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const taskUrl = config.API_BASE_URL + '/tasks/';

            if (!token) {
                console.error('No token found');
                setSessionExpiredOpen(true); 
                return; 
            }

            try {
                const response = await fetch(taskUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });  
                const data = await response.json();
                console.log(data);

                if (response.ok){
                    setTaskCount(data.count); 

                    const unassignedCount = data.results.filter(task => task.assignee === null).length;
                    setUnassignedCount(unassignedCount);

                    const assignedCount =  data.results.filter(task => task.assignee !== null).length;
                    setAssignedCount(assignedCount);

                    const reviewCount =  data.results.filter(task => task.is_submitted === true).length;
                    setReviewCount(reviewCount);
                }else{
                    if (response.status === 401 || response.status === 403) {
                        setSessionExpiredOpen(true);
                        return;
                    }
                    setSnackbarMessage('Failed to load contents...'); 
                    setOpenSnackbar(true); 
                }

            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                setSnackbarMessage(error.message || 'Failed to load contents...'); 
                setOpenSnackbar(true); 
            }
        };

        fetchTasks();
    }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

    const handleDialogClose = () => {
        setSessionExpiredOpen(false);
    };

    return (
        <React.Fragment>
        <Snackbar 
            open={openSnackbar} 
            autoHideDuration={4000} // Adjust duration as needed
            onClose={() => setOpenSnackbar(false)}
        >
        <MuiAlert severity="error" onClose={() => setOpenSnackbar(false)}>
            {snackbarMessage}
        </MuiAlert>
        </Snackbar>
        <Grid container spacing={4}>
            {/* Adjust Grid item size for side-by-side layout */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={require('../assets/clouds.JPG')}
                            alt="Clouds"
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '20px' }}>
                            {taskCount} Tasks In Total
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Number of all tasks that have been created by you. You are the owner of those tasks.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={require('../assets/light_flower.JPG')}
                            alt="Green Iguana"
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '20px' }}>
                            {assignedCount} Tasks Assigned
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tasks created by you that have been assigned to our users and are in progress.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={require('../assets/white_flower.JPG')}
                            alt="Green Iguana"
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '20px' }}>
                            {unassignedCount} Tasks Unassigned
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tasks created by you that have not been neither assigned to nor started by our users successfully.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="140"
                            image={require('../assets/clear_water.JPG')}
                            alt="Green Iguana"
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '20px' }}>
                            {reviewCount} Tasks to Review
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tasks that are completed and submitted by our users. You can start review them!
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleDialogClose} />
        </React.Fragment>
    );
}


export default TaskCards