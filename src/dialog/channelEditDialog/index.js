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

const ChannelEditDialog = (props) => {
  const { open, setOpen, selectedChannelIds } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    selectedChannelIds.map((channelId) => console.log(channelId));
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography id="form-dialog-title" variant="h3" component="span">Edit Channel</Typography>
        </DialogTitle>
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
                id="channelId"
                label="Channel Id"
                variant="outlined"
                fullWidth
                disabled
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
                id="channelname"
                label="Channel Name"
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
            <Grid item xs={3}>
              <Typography variant="subtitle1">User Id: </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="dense"
                id="userid"
                label="User Id"
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
            <Grid item xs={3}>
              <Typography variant="subtitle1">Owner: </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl component="span">
                <RadioGroup row aria-label="position" name="position" defaultValue="publisher">
                  <FormControlLabel
                    value="publisher"
                    control={<Radio color="primary" />}
                    label="Publisher"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="subscriber"
                    control={<Radio color="primary" />}
                    label="Subscriber"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="primary" variant="contained">
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
