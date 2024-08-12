import React, { useEffect, useState } from "react";
import {Box, CircularProgress, Typography, Stack, Button,
    Container,
    Alert,
} from "@mui/material";
import { CardDisplay, ChipDisplay } from "./tagDisplay";
import { deleteObject, listRetrival, setLikeStatus } from "./apiService";
import SessionExpiredDialog from "./sessionExpiredDialog";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import callApi from "./utils";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";


export default function GeneralTagComponent({title, isProperty=true, filter=false, filterCriteria=null}) {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userID = storedData ? storedData.userID : null;
    const token = storedData ? storedData.token : null; 

    const [properties, setProperties] = useState([]);
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');


    useEffect(() => {
        if (isProperty){
            const fetchProperties = async () => {
                const apiUrl = `${config.API_BASE_URL}/properties/`;
                const properties = await listRetrival (
                    token,
                    apiUrl,
                    'property',
                    sessionExpiredOpen,
                    setError,
                    setLoading,
                    filter,
                    filterCriteria
                );
                setProperties(properties)
            }

            if (userID) {
                fetchProperties();
            }
        }
    }, [userID, filterCriteria, isProperty])

    useEffect(() => {
        if (!isProperty){
            const fetchUserProperties = async () => {
                const apiUrl = `${config.API_BASE_URL}/user_properties/`;
                const userProperties = await listRetrival (
                    token, 
                    apiUrl,
                    'user_property',
                    sessionExpiredOpen,
                    setError,
                    setLoading,
                    filter,
                    filterCriteria
                );

                let correspondingProperties = []

                for (const userProperty of userProperties) {
                    const url =  `${config.API_BASE_URL}/properties/${userProperty.property}/`;
        
                    try{
                        const result = await callApi(token, url);

                        if (result.error){
                            setError("Error fetching property tag details.");
                            return;
                        }

                        correspondingProperties.push({
                            id: result.ok.id,     // Extract id
                            name: result.ok.name  // Extract name
                        })
                    } catch (error) {
                        setError(error.message || "Error fetching property tag details.");
                    }
                }
                setProperties(correspondingProperties);
            }

            if (userID) {
                fetchUserProperties();
            }
        }
    }, [userID, filterCriteria, isProperty])

    const navigate = useNavigate(); 

    const handleDeleteProperty = async (property) => {
        const url = `${config.API_BASE_URL}/properties/`;

        const alternativeErrorMessage = 'Failed to delete the selected property tag.';
        const supplementPermissionMessage = 'You cannot delete a property tag created by other users!'
        const successMessage = 'The selected property tag has been deleted successfully!';

        deleteObject(
            token,
            url,
            property.id, 
            alternativeErrorMessage,
            supplementPermissionMessage,
            successMessage,
            setSessionExpiredOpen,
            setAlertMessage,
            setAlertSeverity,
            setShowAlert,
            navigate
        )
    };

    const handleLikeProperty = async (property) => {
        const url = `${config.API_BASE_URL}/user_properties/`;

        const body = {
            'user': userID,
            'property': property.id
        };
    
        const updateBody = {
            'is_interested': true
        };

        setLikeStatus(
            token, 
            url,
            property,
            body,
            updateBody,
            setSessionExpiredOpen,
            setAlertMessage,
            setAlertSeverity,
            setShowAlert,
            true,
            true
        );
    };

    const handleDislikeProperty = async (property) => {
        const url = `${config.API_BASE_URL}/user_properties/`;

        const body = {
            'user': userID,
            'property': property.id,
            'is_interested': false
        };
    
        const updateBody = {
            'is_interested': false
        };

        setLikeStatus(
            token, 
            url,
            property,
            body,
            updateBody,
            setSessionExpiredOpen,
            setAlertMessage,
            setAlertSeverity,
            setShowAlert,
            false,
            true
        );
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing); 
        setShowAlert(false);
    };
    
    const handleSessionExpiredDialogClose = () =>{
        setSessionExpiredOpen(false);
    }

    if (loading) return <CircularProgress />;

    if (error) return <Typography color="error">{error}</Typography>;


    // if (properties.length === 0) {
    //     return (
    //       <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
    //         <Typography sx={{fontSize: 22}}>
    //           {is_interested ? 
    //             "No task properties have been marked as 'interested'." 
    //             : 
    //             "No task properties have been marked as 'uninterested' by you." 
    //           }
    //         </Typography>
    //       </Box>
    //     );
    //   };

    return (
        <>
            <Typography 
                variant="h5" 
                sx = {{ marginLeft: 15, 
                        marginTop: 5, 
                        marginBottom: '30px',
                        fontWeight: 'bold', 
                        color: '#3B3B3B'
                    }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    height: 15,
                    borderRadius: 0.5,
                    bgcolor: '#EEEEEE',
                    '&:hover': {
                        bgcolor: '#EEEEEE',
                    },
                    md: 4,
                    marginBottom: 4,
                    marginLeft: 10,
                    marginRight: 10
                }}
            />
            <Box
                sx={{ 
                md: 4,
                marginBottom: 4,
                marginLeft: 10,
                marginRight: 10}}
            >
                {showAlert && ( 
                    <Alert 
                        severity={alertSeverity} 
                        onClose={() => setShowAlert(false)}
                    >
                        {alertMessage}
                    </Alert>
                )}
            </Box>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Stack direction="row" justifyContent="flex-end">
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={handleEditClick} 
                        sx={{marginBottom: '30px', marginTop: '40px'}}
                    >
                        {isEditing ? "Done" : "Edit"}
                    </Button>
                </Stack>
                <SessionExpiredDialog 
                    open={sessionExpiredOpen} 
                    onClose={handleSessionExpiredDialogClose} 
                />
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    height="70vh"
                >
                    {isProperty? (
                        <CardDisplay
                            tags={properties} 
                            onDeleteTag={handleDeleteProperty} 
                            onLikeTag={handleLikeProperty}
                            onDislikeTag={handleDislikeProperty} 
                            isEditing={isEditing} 
                        />
                        ) : (
                        <ChipDisplay
                            tags={properties} 
                            onDeleteTag={handleDeleteProperty}  
                            isEditing={isEditing} 
                        />
                        )
                    } 
                </Box>
            </Container>
        </>
    );
}