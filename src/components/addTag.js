import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddTag(props){
    //const [open, setOpen] = useState(false);
    //console.log("here" + props.open)
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle> Create New Task Property Tag</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Property Name"
            type="text"
            fullWidth
            required
            variant="standard"
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
        </DialogActions>
        </Dialog>
    )
}

export default AddTag
