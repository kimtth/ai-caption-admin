import { useMutation } from '@apollo/client';
import { DialogTitle, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { userCreateQuery } from '../../api/graph-queries';

const UserAddDialog = (props) => {
  const { open, setOpen } = props;
  const [handleAddFragment, { loadingM, errorM, dataM, called }] = useMutation(userCreateQuery);

  if (loadingM) return 'Loading...';
  if (called) return 'Called...';
  if (errorM) return `Error! ${errorM.message}`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const userValue = new FormData(e.target);
    handleAddFragment({ variables: { user: userValue } });
    console.log(dataM);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography id="form-dialog-title" variant="h3" component="span">Add User</Typography>
        </DialogTitle>
        <form onSubmit={handleAdd}>
          <DialogContent dividers>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1">User ID: </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="userId (e-mail)"
                  type="email"
                  label="e-mail"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1">User Name: </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="dense"
                  id="username"
                  label="User Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography variant="subtitle1">Password: </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  // type="password"
                  variant="outlined"
                  fullWidth
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

export default UserAddDialog;
