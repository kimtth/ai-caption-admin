import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, Grid, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import UserAddDialog from '../../../dialog/userAddDialog';
import UserDeleteDialog from '../../../dialog/userDeleteDialog';
import UserEditDialog from '../../../dialog/userEditDialog';
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

const Toolbar = ({ className, selectedUserIds, setFilter, setFilterOn, setDialogError, callback, ...rest }) => {
  const classes = useStyles();
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [searchCriteria, setSearchCriteria] = React.useState('userId');
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const handleClickAddOpen = (open) => {
    setAddOpen(open);
  };

  const handleClickEditOpen = (open) => {
    if (selectedUserIds?.length > 1) {
      alert('please select only one item.');
    } else if (selectedUserIds?.length === 0) {
      alert('please select an item.');
    } else {
      setEditOpen(open);
    }
  };

  const handleClickDeleteOpen = (open) => {
    if (selectedUserIds?.length === 0) {
      alert('please select an item.');
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
      <UserAddDialog
        open={addOpen}
        callback={callback}
        setOpen={handleClickAddOpen} 
        setDialogError={setDialogError}
      />
      <UserDeleteDialog
        open={deleteOpen}
        callback={callback}
        setOpen={handleClickDeleteOpen}
        selectedUserIds={selectedUserIds}
        setDialogError={setDialogError}
      />
      <UserEditDialog
        open={editOpen}
        callback={callback}
        setOpen={handleClickEditOpen}
        selectedUserIds={selectedUserIds}
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
          onClick={() => handleClickAddOpen(true)}
        >
          Add
        </Button>
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
                      <MenuItem value={'userId'}>User Id</MenuItem>
                      <MenuItem value={'username'}>User Name</MenuItem>
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
                    placeholder="Search user"
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
