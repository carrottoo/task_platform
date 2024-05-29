import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Chip,
  Pagination,
  Button,
  IconButton,
  Tooltip,
  Container,
  Divider,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from '@mui/icons-material/Favorite';
import config from "../config/config";
import callApi from "./utils";
import SessionExpiredDialog from "./sessionExpiredDialog";
import { UnfoldLess } from "@mui/icons-material";

// ... your other components and imports
function PropertyTags({ tags, onDeleteTag, onLikeTag, isEditing}) {
    const [currentPage, setCurrentPage] = useState(1);
    const tagsPerPage = 15; // Adjust the number of tags per page
  
    const indexOfLastTag = currentPage * tagsPerPage;
    const indexOfFirstTag = indexOfLastTag - tagsPerPage;
    const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);
    const totalPages = Math.ceil(tags.length / tagsPerPage);
  
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    return (
        <Grid container direction="column" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={1} flexWrap="wrap"> 
              {currentTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ position: "relative" }}
                onDelete={isEditing ? () => onDeleteTag(tag) : undefined}
                deleteIcon={<DeleteIcon />}
              >
                {/* Like button with a Tooltip */}
                <Tooltip title="Like Tag">
                  <IconButton
                    onClick={() => onLikeTag(tag)}
                    aria-label="like tag" // For accessibility
                    disabled={!isEditing} // Only clickable in edit mode
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              </Chip>
            ))}
          </Stack>
        </Grid>
        <Grid item>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 50}} // Add margin to the top
        />
       </Grid>
      </Grid>
    );
  }

function CreatedTags() {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userID = storedData ? storedData.userID : null;
    const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            const apiUrl = `${config.API_BASE_URL}/properties/`; 

            try {
                const result = await callApi(apiUrl); 

                if (result.error?.toLowerCase().includes("Session expired")) {
                    setSessionExpiredOpen(true);
                    return;
                }

                if (result.error) {
                    setError("Unable to fetch tag properties");
                    return;
                }

            const propertyData = result.ok.results || [];
            setTags(propertyData)

            } catch (err) {
                setError(err.message || "Unable to fetch tag properties");

            } finally {
                setLoading(false);
            }
        };

        if (userID) {
            fetchTags();
        }
    }, [userID]);

  const handleDeleteTag = async (tag) => {
    // const apiUrl = `${config.API_BASE_URL}/tags/${tag}/`; // Assuming tag is the tag ID
    // try {
    //   const result = await callApi(apiUrl, "DELETE");
    //   if (result.error) {
    //     console.error("Error deleting tag:", result.error);
    //   } else {
    //     setTags(prevTags => prevTags.filter(t => t !== tag));
    //   }
    // } catch (err) {
    //   console.error("Error deleting tag:", err.message);
    // }
  };

  const handleLikeTag = async (tag) => {

  }

  const handleEditClick = () => {
    setIsEditing(!isEditing); 
  };

  const handleSessionExpiredDialogClose = () =>{
    setSessionExpiredOpen(false);
  }


  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
        <Typography variant="h5" sx = {{ marginLeft: 15, marginTop: 5, marginBottom: '30px',
            fontWeight: 'bold', color: '#3B3B3B'}}>
        Created Task Property Tags
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
                marginRight: 10}}
        />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="flex-end">
        <Button variant="outlined" color="primary" onClick={handleEditClick} sx={{marginBottom: '30px', marginTop: '40px'}}>
            {isEditing ? "Done" : "Edit"}
        </Button>
        </Stack>
        <SessionExpiredDialog open={sessionExpiredOpen} onClose={handleSessionExpiredDialogClose} />
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <PropertyTags tags={tags} onDeleteTag={handleDeleteTag} onLikeTag={handleLikeTag} isEditing={isEditing} />
        </Box>
        </Container>
    </>
  );
}

export default CreatedTags;
