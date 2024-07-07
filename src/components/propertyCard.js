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


const PropertyCard = () =>{
    const [propertyCount, setPropertyCount] = useState(0); 

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const taskUrl = config.API_BASE_URL + '/properties/';

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
                
                if(response.ok){
                    setPropertyCount(data.count);
                }else{
                    if (response.status === 401 || response.status === 403) {
                        setSessionExpiredOpen(true);
                        return;
                    }
                    setSnackbarMessage('Failed to load contents...');
                    setOpenSnackbar(true); 

                } 

            } catch (error) {
                console.error('Failed to fetch properties:', error);
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
                            image={require('../assets/white_stones.JPG')}
                            alt="Clouds"
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '20px' }}>
                            {propertyCount} Properties In Total
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Number of all properties that have been created by you. Properties defines the characteristics or category of a task.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleDialogClose} />
        </React.Fragment>
           
    );
}


export default PropertyCard