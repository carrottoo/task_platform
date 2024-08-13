import * as React from "react";
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
