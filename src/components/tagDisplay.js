import React, { useState, useEffect } from "react";
import {
  Typography,
  Pagination,
  IconButton,
  Tooltip,
  Grid,
  CardContent,
  CardActions,
  Card,
  Stack,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function CardDisplay({
  tags,
  onDeleteTag,
  onLikeTag,
  onDislikeTag,
  isEditing,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 15; // Adjust the number of tags per page

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);
  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Grid container spacing={2}>
          {currentTags.map((tag) => (
            <Grid item key={tag.id} xs="auto">
              <Card
                sx={{
                  display: "flex",
                  width: "auto",
                  maxWidth: 400,
                  padding: 1,
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                  <Typography
                    variant="h7"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tag.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  {isEditing && (
                    <Tooltip title="Delete Tag">
                      <IconButton
                        onClick={() => onDeleteTag(tag)}
                        aria-label="delete tag" // For accessibility
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isEditing && userProfile === "employee" && (
                    <Tooltip title="Like Tag">
                      <IconButton
                        onClick={() => onLikeTag(tag)}
                        aria-label="like tag" // For accessibility
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isEditing && userProfile === "employee" && (
                    <Tooltip title="Dislike Tag">
                      <IconButton
                        onClick={() => onDislikeTag(tag)}
                        aria-label="dislike tag" // For accessibility
                      >
                        <SentimentVeryDissatisfiedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 50 }} // Add margin to the top
        />
      </Grid>
    </Grid>
  );
}

export function ChipDisplay({ tags, onDeleteTag, isEditing }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 15; // Adjust the number of tags per page

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);
  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;

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
              onDelete={isEditing ? () => onDeleteTag(tag) : undefined}
              deleteIcon={isEditing ? <DeleteIcon /> : undefined} // Only show delete icon in edit mode
            />
          ))}
        </Stack>
      </Grid>
      <Grid item>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 50 }} // Add margin to the top
        />
      </Grid>
    </Grid>
  );
}
