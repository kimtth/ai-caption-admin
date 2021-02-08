import { useMutation, useQuery } from '@apollo/client';
import { DialogTitle, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { channelOneQuery, channelUpdateQuery } from '../../api/graph-queries';

const ChannelEditDialog = (props) => {
  const { open, setOpen, selectedChannelIds } = props;
  const [bool] = React.useState(true);
  const { loading, error, data } = useQuery(channelOneQuery, {
    variables: { id: selectedChannelIds },
  });
  const [handleEditFragment, { loadingM, errorM, dataM, called }] = useMutation(channelUpdateQuery);

  if (loading || loadingM) return 'Loading...';
  if (called) return 'Called...';
  if (error) return `Error! ${error.message}`;
  if (errorM) return `ErrorM! ${errorM.message}`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    //selectedChannelIds.map((channelId) => console.log(channelId));
    const channelValue = new FormData(e.target);
    handleEditFragment({ variables: { _id: selectedChannelIds, channel: channelValue } });
    console.log(dataM);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography id="form-dialog-title" variant="h3" component="span">Edit Channel</Typography>
        </DialogTitle>
        <form onSubmit={handleEdit}>
          <DialogContent dividers>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Channel ID: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="id"
                  label="Channel Id"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={data?.id}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Channel Name: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Channel Name"
                  variant="outlined"
                  fullWidth
                  value={data?.name}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">User Id: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="userId"
                  label="User Id"
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
                <Typography variant="subtitle1">Owner: </Typography>
              </Grid>
              <Grid item xs={9}>
                <FormControl component="span">
                  <RadioGroup row aria-label="position" name="position" defaultValue={bool} value={data?.owner}>
                    <FormControlLabel
                      value={bool}
                      control={<Radio color="primary" />}
                      label="Publisher"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value={!bool}
                      control={<Radio color="primary" />}
                      label="Subscriber"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
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

export default ChannelEditDialog;
