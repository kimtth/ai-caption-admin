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
  const { open, setOpen, selectedChannelIds, setDialogError, callback } = props;
  const { loading, error, data } = useQuery(channelOneQuery, {
    variables: { id: selectedChannelIds[0] },
    skip: selectedChannelIds.length < 1,
    fetchPolicy: "no-cache"
  });
  const [handleEditFragment, { loadingM, errorM, dataM, called }] = useMutation(channelUpdateQuery, {errorPolicy: 'all'});
  const [channelName, setChannelName] = React.useState('');
  const [owner, setOwner] = React.useState('');

  React.useEffect(() => {
    if (data) {
      setChannelName(data?.channel.name);
      setOwner(data?.channel.owner ? 'pub' : 'sub');
    }
  }, [data])

  if (loading || loadingM) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleClose = () => {
    setOpen(false);
    if (errorM) setDialogError(errorM.message);
  };

  const handleEdit = (e) => {
    e.preventDefault()
    const channelValue = {
      ...data.channel,
      name: channelName,
      owner: owner === 'pub' ? true : false
    }
    delete channelValue.__typename;
    delete channelValue._id;

    handleEditFragment({ variables: { _id: selectedChannelIds[0], channel: channelValue } });
    callback();
    setOpen(false);
    if (errorM) setDialogError(errorM.message);
  };

  const handleChange = (evt) => {
    setChannelName(evt.target.value);
  }

  const handleRadioChange = (evt) => {
    setOwner(evt.target.value);
  }

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
                  value={data?.channel.id}
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
                  onChange={handleChange}
                  value={channelName}
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
                  disabled
                  value={data?.channel.userId}
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
                  <RadioGroup
                    row aria-label="position"
                    name="position"
                    defaultValue="pub"
                    onChange={handleRadioChange}
                    value={owner}>
                    <FormControlLabel
                      value="pub"
                      control={<Radio color="primary" />}
                      label="Publisher"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="sub"
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

export default ChannelEditDialog;
