import React, { useState } from 'react';
import { Button, Card, Container, Paper, Typography, Stack } from "@mui/material";
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import BadgeIcon from '@mui/icons-material/Badge';
import { Link } from 'react-router-dom';
import config from '../config/config';
import Alert from '@mui/material/Alert';
import theme from './theme';
import {ThemeProvider} from '@mui/material/styles';


function SetProfile(){
    const apiUrl = config.API_BASE_URL + '/user_profiles/';

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');


    const handleEmployer = async () => {

        if (!token) {
            console.error('No token found');
            setAlertMessage('Your session has expired, please sign in')
            setShowAlert(true)
            return; 
        }

        console.log(token)

        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': storedData.userID,
                    'is_employer': true
                })
            })

            const data = await response.json();

            if (response.ok) {
                console.log('Profile set successfully:', data);
                setAlertMessage('Profile set successfully!')
                setAlertSeverity('success');
                setShowAlert(true);

                const updatedData = { 
                    ...storedData, 
                    profile: data.isEmployer? 'employer' : 'employee '
                  };
                
                localStorage.setItem("userData", JSON.stringify(updatedData));

                if (data.isEmployer){
                    setTimeout(() => {
                        window.location.href = '/employer';
                    }, 1000); // 1000 milliseconds = 1 seconds
                }else{
                    setTimeout(() => {
                        window.location.href = '/employee';
                    }, 1000); // 1000 milliseconds = 1 seconds
                }

            } else {
                setAlertMessage(data.errors.user.message || data.detail.message || 'Failed to set profile')
                setShowAlert(true)
            }

        }catch(error){
            console.error('Error setting profile:', error);
            const errorMessage = error.message || 'Failed to set profile, please try again.';
            setAlertMessage(errorMessage);
            setShowAlert(true); 
        }
    }

    const handleEmployee = async () => {

        if (!token) {
            console.error('No token found');
            setAlertMessage('Your session has expired, please sign in')
            setShowAlert(true)
            return; 
        }

        console.log(token)

        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': storedData.userID,
                    'is_employer': false
                })
            })

            const data = await response.json();

            if (response.ok) {
                console.log('Profile set successfully:', data);
                setAlertMessage('Profile set successfully!')
                setAlertSeverity('success');
                setShowAlert(true);

            } else {
                setAlertMessage(data.errors.user.message || data.detail.message || 'Failed to set profile')
                setShowAlert(true)
            }

        }catch(error){
            console.error('Error setting profile:', error);
            const errorMessage = error.message || 'Failed to set profile, please try again.';
            setAlertMessage(errorMessage);
            setShowAlert(true); 
        }

    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} style={{ padding: '16px' }}>
            {showAlert && ( 
                <Alert 
                    severity={alertSeverity} 
                    onClose={() => setShowAlert(false)}
                    // style={{ position: 'absolute', top: '20', left: '50', zIndex: 2 }}
                >
                    {alertMessage}
                </Alert>
            )}
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, m: 0,  background: 'none', boxShadow: 'none'}}>
                <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' , marginTop: '20px'}}>
                <BadgeIcon />
                </Avatar>
            </Card>
            <Typography component="h1" variant="h6" style={{marginTop: '20px'}}>
                    Please select your profile
            </Typography>
            <Stack 
                    direction="row" 
                    spacing={2}  
                    justifyContent="center" 
                    alignItems="center"
                    style={{ marginTop: '30px'}}>    
                    <Fab variant="extended" size="small" color="primary" style={{marginRight: '20px'}} onClick={handleEmployer}>
                        Employer
                    </Fab>
                    <Fab variant="extended" size="small" color="primary" onClick={handleEmployee}>
                        Employee
                    </Fab>
            </Stack>
            <Typography variant="body2" style={{marginTop: '40px'}}>
                    Login expired? 
                    <Link reloadDocument to="/signin" style={{ marginLeft: '5px' }} className='link'>
                        Sign in here 
                    </Link>
            </Typography>



              
            </Paper>

    
        </Container>
        </ThemeProvider>
    )

}

export default SetProfile