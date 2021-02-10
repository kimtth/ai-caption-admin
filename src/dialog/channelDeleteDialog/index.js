import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { channelDeleteQuery } from '../../api/graph-queries';

const ChannelDeleteDialog = (props) => {
  const { open, setOpen, selectedChannelIds, callback } = props;
  const [handleDeleteFragment, { data }] = useMutation(channelDeleteQuery, {errorPolicy: 'all'});

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    selectedChannelIds.map((_Id) => console.log(_Id));
    handleDeleteFragment({ variables: { _ids: selectedChannelIds } });
    callback();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Channel</DialogTitle>
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

export default ChannelDeleteDialog;
