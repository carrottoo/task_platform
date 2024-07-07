import React, { useState, useEffect, useCallback  } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import config from '../config/config'; 
import ResetPasswordDialog from './resetPassword';
import SessionExpiredDialog from './sessionExpiredDialog';
import ErrorDisplay from './errorDisplay';
import callApi  from './utils';
import {userMapping} from './mapping';

//TODO test rest password 

const UserProfile = () => {
    const [editMode, setEditMode] = useState(false); 
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        profile: '',
        lastLogin: '',
        dateJoined: ''
    });
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);

    const [originalUser, setOriginalUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: ''
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const userID = storedData ? storedData.userID : null;
    const token = storedData ? storedData.token : null;
    const userProfile = storedData ? storedData.profile : null;

    const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

    const handleOpenResetPasswordDialog = () => {
        setOpenResetPasswordDialog(true);
    };

    const handleCloseResetPasswordDialog = () => {
        setOpenResetPasswordDialog(false);
    };

    const fetchUserData = useCallback(async () => {
        const apiUrl = `${config.API_BASE_URL}/users/${userID}/`;

        try{
            const result = await callApi(token, apiUrl);

            if (result.sessionExpired){
                setSessionExpiredOpen(true);
                return;
            }

            if (result.error){
                setError('Unable to fetch user data');
                return;
            }

            const userData = result.ok;

            const lastLoginTimestamp = userData.last_login;
            const lastLoginDate = new Date(lastLoginTimestamp);
        
            const joinTimestamp = userData.date_joined;
            const joinDate = new Date(joinTimestamp);
          
            const formattedUser = {
                firstName: userData.first_name,
                lastName: userData.last_name,
                username: userData.username,
                email: userData.email,
                profile: userProfile,
                lastLogin: lastLoginDate.toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric',
                    hour: 'numeric', 
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short'
                }),
                dateJoined: joinDate.toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric',
                    timeZoneName: 'short'
                })
            }

            setUser(formattedUser);
            setOriginalUser(formattedUser);

        }catch (error) {
            setError(error.message || 'Unable to fetch user data');
            
        }finally{
            setLoading(false);
        }

    }, [userID, userProfile]);
    
    useEffect(() => {
    fetchUserData();
    }, [fetchUserData]);

    const handleRetry = () => {
        setError('');
        setErrors('');
        setLoading(true);
        fetchUserData();
    };

    const handleToggleEdit = () => {
        setEditMode((prevEditMode) => {
            console.log('Toggling edit mode:', !prevEditMode);
            return !prevEditMode;
        });
        setError('');
        setErrors('');
        setShowAlert(false);
        fetchUserData();
    };

    const handleInputChange = (prop) => (event) => {
     
        setUser(prevUser => {
            const newValue = event.target.value;
            if (newValue !== prevUser[prop]) {
                // Value has changed, you can log it, perform additional actions, etc.
                console.log(`Field ${prop} changed from ${prevUser[prop]} to ${newValue}`);
            }
            return { ...prevUser, [prop]: newValue }; // Update the state
        });

        setShowAlert(false);
        setError('');
        setErrors('');
        setLoading(false);

    };

    const handleSaveProfile = async () => {
        const apiUrl = config.API_BASE_URL + '/users/' + userID + '/';

        const changedFields = {};
        for (const frontendField in user) {
            const backendField = userMapping[frontendField];
            if (user[frontendField] !== originalUser[frontendField] && backendField) {
              changedFields[backendField] = user[frontendField];
            }
        }

        console.log(changedFields);

        if(Object.keys(changedFields).length > 0){

            try{
                const result = await callApi(apiUrl, 'PATCH', changedFields);

                if (result.sessionExpired){
                    setSessionExpiredOpen(true);
                    return;
                }

                if (result.error){
                    const formattedErrors = {};
                    for (const frontendField in userMapping) { // Iterate through frontend fields
                        const backendField = userMapping[frontendField];

                        if (result.error[backendField]) { 
                            formattedErrors[frontendField] = result.error[backendField];
                        } else {
                            formattedErrors[frontendField] = ''; // Set to empty string if not found in errors
                        }
                    }
                    setErrors(formattedErrors);
                    setAlertMessage('Failed to update profile.');
                    setAlertSeverity('error');
                    setShowAlert(true);
                    return;
                }

                setAlertMessage('Profile updated successfully.');
                setAlertSeverity('success');
                setShowAlert(true);
                setEditMode(false);
        
            } catch (error) {
                setAlertMessage(error.message||'Failed to update profile.');
                setAlertSeverity('error')
                setShowAlert(true);
            }
        };

        setEditMode(false);
    }

    const handleDialogClose = () => {
        setSessionExpiredOpen(false);
    };

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
        );
    }

    if (error) {
        return <ErrorDisplay errorMessage={error} onRetry={handleRetry} />;
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
        <Box 
            width="50%" 
            padding="20px" 
            // border="1px solid #ccc" 
            borderRadius="8px" 
            maxHeight="calc(70vh - 20px)" 
            overflow="auto"
        >
            <Typography variant="h4" component="h2" sx={{color: '#3B3B3B'}} gutterBottom>
            User Profile
            </Typography>
            {showAlert && (
            <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
                {alertMessage}
            </Alert>
            )}
            {user && (
            <>
                <TextField
                label="First Name"
                name="firstName"
                value={user.firstName || ''}
                onChange={handleInputChange('firstName')}
                error={errors['firstName']}
                helperText={errors['firstName'] ? errors['firstName'].message || errors['firstName'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={!editMode}
                />
                <TextField
                label="Last Name"
                name="lastName"
                value={user.lastName || ''}
                onChange={handleInputChange('lastName')}
                error={errors['lastName']}
                helperText={errors['lastName'] ? errors['lastName'].message || errors['lastName'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={!editMode}
                />
                <TextField
                label="Username"
                name="name"
                value={user.username || ''}
                onChange={handleInputChange('username')}
                error={errors['username']}
                helperText={errors['username'] ? errors['username'].message || errors['username'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={!editMode}
                />
                <TextField
                label="Email"
                name="email"
                value={user.email || ''}
                onChange={handleInputChange('email')}
                error={errors['email']}
                helperText={errors['email'] ? errors['email'].message || errors['email'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={!editMode}
                />
                <TextField
                label="Identity profile"
                name="profile"
                value={userProfile || ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={true}
                />
                <TextField
                label="Last login"
                name="lastLogin"
                value={user.lastLogin|| ''}
                onChange={handleInputChange('lastLogin')}
                error={errors['lastLogin']}
                helperText={errors['lastLogin'] ? errors['lastLogin'].message || errors['lastLogin'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={true}
                />
                <TextField
                label="Date joined"
                name="dateJoined"
                value={user.dateJoined|| ''}
                onChange={handleInputChange('dateJoined')}
                error={errors['dateJoined']}
                helperText={errors['dateJoined'] ? errors['dateJoined'].message || errors['dateJoined'] : ''}
                margin="normal"
                variant='standard'
                fullWidth
                disabled={true}
                />
                {/* Add more fields as needed */}
                <Box display="flex" justifyContent="space-between" marginTop="20px">
                <Button onClick={handleToggleEdit} variant="contained" color="primary">
                    {editMode ? 'Cancel' : 'Edit'}
                </Button>
                {editMode && (
                    <>
                    <Button onClick={handleSaveProfile} variant="contained" color="secondary">
                    Save
                    </Button>
                    <Button  onClick={handleOpenResetPasswordDialog} variant="outlined" color="error">
                        Reset Password
                    </Button> 
                    </>
                )}
                </Box>
            </> 
            )}
            <ResetPasswordDialog open={openResetPasswordDialog} onClose={handleCloseResetPasswordDialog} />
        </Box>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleDialogClose} />
        </Box>
    );
};

export default UserProfile;

