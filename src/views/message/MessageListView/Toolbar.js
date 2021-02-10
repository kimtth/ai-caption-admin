import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, Grid, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import MessageDeleteDialog from '../../../dialog/messageDeleteDialog';
import MessageEditDialog from '../../../dialog/messageEditDialog';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  basicButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

const Toolbar = ({ className, selectedMessageIds, callback, ...rest }) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [searchCriteria, setSearchCriteria] = React.useState('conversationText');

  const handleClickEditOpen = (open) => {
    if (selectedMessageIds?.length > 1) {
      alert('please select only one item.');
    } else if (selectedMessageIds?.length === 0) {
      alert('please select an item.');
    } else {
      setEditOpen(open);
    }
  };

  const handleClickDeleteOpen = (open) => {
    if (selectedMessageIds?.length === 0) {
      alert('please select an item.');
    } else {
      setDeleteOpen(open);
    }
  };

  const handleSelectChange = (e) => {
    setSearchCriteria(e.target.value);
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MessageDeleteDialog
        open={deleteOpen}
        callback={callback}
        setOpen={handleClickDeleteOpen}
        selectedMessageIds={selectedMessageIds}
      />
      <MessageEditDialog
        open={editOpen}
        callback={callback}
        setOpen={handleClickEditOpen}
        selectedMessageIds={selectedMessageIds}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          className={classes.basicButton}
          onClick={() => handleClickDeleteOpen(true)}
        >
          Delete
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClickEditOpen(true)}
        >
          Edit
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent style={{ padding: 5 }}>
            <Box maxWidth="90%">
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="simple-select-helper-label">Search Criteria</InputLabel>
                    <Select
                      labelId="simple-select-helper-label"
                      id="simple-select-helper"
                      value={searchCriteria}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'channelId'}>Channel Id</MenuItem>
                      <MenuItem value={'userId'}>User Id</MenuItem>
                      <MenuItem value={'conversationText'}>Recognized</MenuItem>
                      <MenuItem value={'translateText'}>Translate</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={9} style={{ paddingRight: 10 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search message"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    color="primary"
                    variant="contained"
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
