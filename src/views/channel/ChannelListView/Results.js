import { Box, Card, Checkbox, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, channels, selectedChannelIds, setSelectedChannelIds, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleSelectAll = (event) => {
    let newSelectedChannelIds;

    if (event.target.checked) {
      newSelectedChannelIds = channels.map((channel) => channel.id);
    } else {
      newSelectedChannelIds = [];
    }

    setSelectedChannelIds(newSelectedChannelIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedChannelIds.indexOf(id);
    let newSelectedChannelIds = [];

    if (selectedIndex === -1) {
      newSelectedChannelIds = newSelectedChannelIds.concat(selectedChannelIds, id);
    } else if (selectedIndex === 0) {
      newSelectedChannelIds = newSelectedChannelIds.concat(selectedChannelIds.slice(1));
    } else if (selectedIndex === selectedChannelIds.length - 1) {
      newSelectedChannelIds = newSelectedChannelIds.concat(selectedChannelIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedChannelIds = newSelectedChannelIds.concat(
        selectedChannelIds.slice(0, selectedIndex),
        selectedChannelIds.slice(selectedIndex + 1)
      );
    }

    setSelectedChannelIds(newSelectedChannelIds);
  };

  const handleLimitChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedChannelIds.length === channels.length}
                    color="primary"
                    indeterminate={
                      selectedChannelIds.length > 0
                      && selectedChannelIds.length < channels.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Channel Id
                </TableCell>
                <TableCell>
                  Channel Name
                </TableCell>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Owner
                </TableCell>
                <TableCell>
                  Published
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((channel) => (
                <TableRow
                  hover
                  key={channel.id}
                  selected={selectedChannelIds.indexOf(channel._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedChannelIds.indexOf(channel._id) !== -1}
                      onChange={(event) => handleSelectOne(event, channel._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {channel.id}
                  </TableCell>
                  <TableCell>
                    {channel.name}
                  </TableCell>
                  <TableCell>
                    {channel.userId}
                  </TableCell>
                  <TableCell>
                    {channel.owner ? 'publisher' : 'subscriber'}
                  </TableCell>
                  <TableCell>
                    {moment(parseInt(channel.publishedDate, 10)).format('YYYY/MM/DD HH:MM:SS')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={channels.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100, 300, 500]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  channels: PropTypes.array.isRequired
};

export default Results;
