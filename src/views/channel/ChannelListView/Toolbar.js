import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, Grid, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ChannelDeleteDialog from '../../../dialog/channelDeleteDialog';
import ChannelEditDialog from '../../../dialog/channelEditDialog';
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

const Toolbar = ({ className, selectedChannelIds, setFilter, setFilterOn, setDialogError, callback, ...rest }) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [searchCriteria, setSearchCriteria] = React.useState('name');
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const handleClickEditOpen = (open) => {
    if (selectedChannelIds?.length > 1) {
      alert('please select only one item.');
      return;
    } else if (selectedChannelIds?.length === 0) {
      alert('please select an item.');
      return;
    } else {
      setEditOpen(open);
    }
  };

  const handleClickDeleteOpen = (open) => {
    if (selectedChannelIds?.length === 0) {
      alert('please select an item.');
      return;
    } else {
      setDeleteOpen(open);
    }
  };

  const handleSelectChange = (e) => {
    setSearchCriteria(e.target.value);
  }

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  }

  const handleSearchButton = (e) =>{
    setFilter({
      criteria: searchCriteria,
      keyword: searchKeyword
    })

    if(searchCriteria){
      setFilterOn(true);
    } else {
      setFilterOn(false);
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <ChannelDeleteDialog
        open={deleteOpen}
        callback={callback}
        setOpen={handleClickDeleteOpen}
        selectedChannelIds={selectedChannelIds}
        setDialogError={setDialogError}
      />
      <ChannelEditDialog
        open={editOpen}
        callback={callback}
        setOpen={handleClickEditOpen}
        selectedChannelIds={selectedChannelIds}
        setDialogError={setDialogError}
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
                      <MenuItem value={'id'}>Channel Id</MenuItem>
                      <MenuItem value={'name'}>Channel Name</MenuItem>
                      <MenuItem value={'userId'}>User Id</MenuItem>
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
                    placeholder="Search channel"
                    variant="outlined"
                    onChange={handleSearchKeyword}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSearchButton}
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
