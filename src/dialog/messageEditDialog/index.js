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
import { messageOneQuery, messageUpdateQuery } from '../../api/graph-queries';

const MessageEditDialog = (props) => {
  const { open, setOpen, selectedMessageIds, callback } = props;
  const { loading, error, data } = useQuery(messageOneQuery, {
    variables: { id: selectedMessageIds[0] },
    skip: selectedMessageIds.length < 1
  });
  const [handleEditFragment, { loadingM, errorM, dataM, called }] = useMutation(messageUpdateQuery, {errorPolicy: 'all'});
  const [conversationText, setConversationText] = React.useState('');
  const [isAudioRecord, setIsAudioRecord] = React.useState('');

  React.useEffect(() => {
    if(data){
      setConversationText(data?.message.conversationText);
      setIsAudioRecord(data?.message.isAudioRecord ? 'yes' : 'no');
    }
  }, [data])

  if (loading || loadingM) return 'Loading...';
  //if (called) return 'Called...';
  if (error) return `Error! ${error.message}`;
  if (errorM) return `ErrorM! ${errorM.message}`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const messageValue = {
      ...data.message,
      conversationText: conversationText,
      isAudioRecord: isAudioRecord === 'yes' ? true : false
    }
    delete messageValue.__typename;
    delete messageValue._id;

    handleEditFragment({ variables: { id: selectedMessageIds[0], message: messageValue } });
    callback();
    setOpen(false);
  };

  const handleChange = (evt) => {
    setConversationText(evt.target.value);
  }

  const handleRadioChange = (evt) => {
    setIsAudioRecord(evt.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography id="form-dialog-title" variant="h3" component="span">Edit Message</Typography>
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
                  id="channelId"
                  label="Channel Id"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={data?.message.channelId}
                />
              </Grid>
            </Grid>
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
                  margin="dense"
                  id="userId"
                  type="email"
                  label="e-mail"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={data?.message.userId}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Recognized: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="conversationText"
                  label="Recognized"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={10}
                  onChange={handleChange}
                  value={conversationText}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Translate: </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  margin="dense"
                  id="translateText"
                  label="Translate"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  disabled
                  value={data?.message.translateText}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Audio Record: </Typography>
              </Grid>
              <Grid item xs={9}>
                <FormControl component="span">
                  <RadioGroup
                    row aria-label="position"
                    name="position"
                    defaultValue="true"
                    onChange={handleRadioChange}
                    value={isAudioRecord}>
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
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

export default MessageEditDialog;
