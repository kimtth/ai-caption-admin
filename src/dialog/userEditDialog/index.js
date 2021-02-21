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
  const { open, setOpen, selectedUserIds, setDialogError, callback } = props;
  const { loading, error, data } = useQuery(userOneQuery, {
    variables: { userId: selectedUserIds[0] },
    skip: selectedUserIds.length < 1,
    fetchPolicy: "no-cache"
  });
  const [handleEditFragment, { loading: m_loading, error: m_error, data: m_data, called }] = useMutation(userUpdateQuery, {errorPolicy: 'all'});
  const [userName, setUserName] = React.useState('');
  const [passWord, setPassword] = React.useState('');
  const [newPassWord, setNewPassword] = React.useState('');

  React.useEffect(() => {
    if (data) {
      setUserName(data?.user.username);
      setPassword(data?.user.password);
    }
  }, [data])

  if (loading || m_loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleClose = () => {
    setOpen(false);
    if (m_error) setDialogError(m_error.message);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const userValue = {
      ...data.user,
      username: userName,
      // Kim: if the password field is not empty. the newPassword is going to be sent. if not, hashed value.
      password: Boolean(newPassWord.trim()) ? newPassWord: passWord
    }
    delete userValue.__typename;
    delete userValue._id;

    handleEditFragment({ variables: { userId: selectedUserIds[0], user: userValue } });
    callback();
    setOpen(false);
    if (m_error) setDialogError(m_error.message);
  };

  const handleChange = (evt) => {
    setUserName(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setNewPassword(evt.target.value);
  }

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
                  disabled
                  value={data?.user.userId}
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
                  value={userName}
                  onChange={handleChange}
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
                  label="Password (Max Length 20)"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 20 }}
                  value={newPassWord}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Hashed: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Hashed"
                  variant="outlined"
                  fullWidth
                  value={passWord}
                  disabled
                />
              </Grid>
            </Grid>
          </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserEditDialog;
