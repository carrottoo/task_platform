import React, { useState, useEffect, useCallback  } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import config from '../config/config'; 
import ResetPasswordDialog from './resetPassword';
import ErrorDisplay from './errorDisplay';
import fieldMapping from './utility';

const UserProfile = () => {
    const [editMode, setEditMode] = useState(false); 
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        lastLogin: '',
        dateJoined: ''
    });

    const [originalUser, setOriginalUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;
    const userID = storedData ? storedData.userID : null;

    const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

    const handleOpenResetPasswordDialog = () => {
        setOpenResetPasswordDialog(true);
    };

    const handleCloseResetPasswordDialog = () => {
        setOpenResetPasswordDialog(false);
    };

    const fetchUserData = useCallback(async () => {
        const apiUrl = `${config.API_BASE_URL}/users/${userID}/`;
    
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              setAlertMessage('Session expired, please click here to sign in.');
              setShowAlert(true);
              return;
            }
    
            setError('Unable to fetch user data');
            setLoading(false);
          }
    
          const userData = await response.json();
    
          // Reformat the last_login and date_joined 
          const lastLoginTimestamp = userData.last_login;
          const lastLoginDate = new Date(lastLoginTimestamp);
      
          const joinTimestamp = userData.date_joined;
          const joinDate = new Date(joinTimestamp);
          
          const formattedUser = {
            firstName: userData.first_name,
            lastName: userData.last_name,
            username: userData.username,
            email: userData.email,
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
          setLoading(false);
    
        } catch (error) {
          setError(error.message || 'Unable to fetch user data');
          setLoading(false);
        }
      }, [token, userID]);
    
    useEffect(() => {
    fetchUserData();
    }, [fetchUserData]);

    const handleRetry = () => {
        setError('');
        setLoading(true);
        fetchUserData();
        };

    const handleToggleEdit = () => {
        setEditMode((prevEditMode) => {
            console.log('Toggling edit mode:', !prevEditMode);
            return !prevEditMode;
        });
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

    };

    const handleSaveProfile = async () => {
        const apiUrl = config.API_BASE_URL + '/users/' + userID + '/';

        const changedFields = {};
        for (const frontendField in user) {
            const backendField = fieldMapping[frontendField];
            if (user[frontendField] !== originalUser[frontendField] && backendField) {
              changedFields[backendField] = user[frontendField];
            }
          }

        console.log(changedFields);

        if(Object.keys(changedFields).length > 0){

            try {
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(changedFields)
            });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setAlertMessage('Session expired, please click here to sign in.');
                        setShowAlert(true);
                        return;
                    }
            
                    setError('Unable to update user data');
                    setLoading(false);
                }

                setAlertMessage('Profile updated successfully.');
                setAlertSeverity('success');
                setShowAlert(true);
                setEditMode(false);

            } catch (error) {
                setAlertMessage(error.message||'Failed to update profile.');
                setAlertSeverity('error');
                setShowAlert(true);
            }
        };
    }

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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box width="50%" padding="20px" border="1px solid #ccc" borderRadius="8px">
            <Typography variant="h4" component="h2" gutterBottom>
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
                margin="normal"
                variant='standard'
                fullWidth
                disabled={!editMode}
                />
                <TextField
                label="Last login"
                name="lastLogin"
                value={user.lastLogin|| ''}
                onChange={handleInputChange('lastLogin')}
                margin="normal"
                variant='standard'
                fullWidth
                disabled='true'
                />
                <TextField
                label="Date joined"
                name="dateJoined"
                value={user.dateJoined|| ''}
                onChange={handleInputChange('dateJoined')}
                margin="normal"
                variant='standard'
                fullWidth
                disabled='true'
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
        
        </Box>
    );
};

export default UserProfile;

