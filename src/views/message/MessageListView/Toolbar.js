import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, Grid, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import MessageDeleteDialog from '../../../dialog/messageDeleteDialog';
import MessageEditDialog from '../../../dialog/messageEditDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  basicButton: {
    marginRight: theme.spacing(1)
  },
}));

const Toolbar = ({ className, selectedMessageIds, ...rest }) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClickEditOpen = (open) => {
    if (selectedMessageIds?.length > 1) {
      // eslint-disable-next-line
      alert('please select only one item.');
    } else if (selectedMessageIds?.length === 0) {
      // eslint-disable-next-line
      alert('please select an item.');
    } else {
      setEditOpen(open);
    }
  };

  const handleClickDeleteOpen = (open) => {
    if (selectedMessageIds?.length === 0) {
      // eslint-disable-next-line
      alert('please select an item.');
    } else {
      setDeleteOpen(open);
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MessageDeleteDialog
        open={deleteOpen}
        setOpen={handleClickDeleteOpen}
        selectedMessageIds={selectedMessageIds}
      />
      <MessageEditDialog
        open={editOpen}
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
                <Grid item xs={11} style={{ paddingRight: 10 }}>
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
