import { useMutation, useQuery } from '@apollo/client';
import { DialogTitle, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { userOneQuery, userUpdateQuery } from '../../api/graph-queries';

const UserEditDialog = (props) => {
  const { open, setOpen, selectedUserIds } = props;
  const { loading, error, data } = useQuery(userOneQuery, {
    variables: { id: selectedUserIds },
  });
  const [handleEditFragment, { loadingM, errorM, dataM, called }] = useMutation(userUpdateQuery);

  if (loading || loadingM) return 'Loading...';
  if (called) return 'Called...';
  if (error) return `Error! ${error.message}`;
  if (errorM) return `ErrorM! ${errorM.message}`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const userValue = new FormData(e.target);
    handleEditFragment({ variables: { userId: selectedUserIds, user: userValue } });
    console.log(dataM);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography id="form-dialog-title" variant="h3" component="span">Edit User</Typography>
        </DialogTitle>
        <form onSubmit={handleEdit}>
          <DialogContent dividers>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">User ID: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="userId"
                  type="email"
                  label="e-mail"
                  variant="outlined"
                  fullWidth
                  value={data?.userId}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">User Name: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="username"
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  value={data?.username}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Password: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  // type="password"
                  variant="outlined"
                  fullWidth
                  value={data?.password}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </form>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserEditDialog;
