import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { userDeleteQuery } from '../../api/graph-queries';

const UserDeleteDialog = (props) => {
  const { open, setOpen, selectedUserIds, setDialogError, callback } = props;
  const [handleDeleteFragment, { error, data }] = useMutation(userDeleteQuery, {errorPolicy: 'all'});

  const handleClose = () => {
    setOpen(false);
    if (error) setDialogError(error.message);
  };

  const handleDelete = () => {
    handleDeleteFragment({ variables: { userIds: selectedUserIds } });
    callback();
    setOpen(false);
    if (error) setDialogError(error.message);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete selected items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            OK
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDeleteDialog;
