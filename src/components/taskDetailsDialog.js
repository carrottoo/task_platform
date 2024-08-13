import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";

const DetailsDialog = ({ task, open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <Box>
          {task &&
            Object.keys(task).map((key) => {
              if (key === "id" || key === "displayId") return null;
              return (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={key}
                  sx={{ marginBottom: "7px" }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#525556" }}>
                    {key}:
                  </Typography>
                  <Typography sx={{ color: "#727475" }}>{task[key]}</Typography>
                </Stack>
              );
            })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

DetailsDialog.propTypes = {
  task: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DetailsDialog;
