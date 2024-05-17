import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';

function ResetPasswordDialog({ open, onClose }) {
  const [confirming, setConfirming] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleConfirmResetPassword = () => {
    setConfirming(true);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    // TODO: Implement password reset logic here (e.g., call API endpoint)
    // After resetting password, close the dialog
    onClose();
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        {confirming ? (
          <>
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              margin="normal"
            //   variant='standard'
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              margin="normal"
            //   variant='standard'
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              margin="normal"
            //   variant='standard'
              fullWidth
            />
          </>
        ) : (
          <DialogContentText>
            Are you sure you want to reset your password? This action cannot be undone.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {confirming ? (
          <>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleResetPassword} color="error">
              Reset
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmResetPassword} color="error">
              Continue
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ResetPasswordDialog;
