import * as React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
} from "@mui/material";

export const RecommendationCard = ({ task, handleAssign }) => {
  console.log(task);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
          {task.name}
        </Typography>
        <Divider />
        <Typography sx={{ mb: 1.5, marginTop: 3 }} color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAssign(task.id)}>
          Assign To Yourself
        </Button>
      </CardActions>
    </Card>
  );
};

RecommendationCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired, // Defines the shape of the task object and marks it as required
  handleAssign: PropTypes.func.isRequired,
};
