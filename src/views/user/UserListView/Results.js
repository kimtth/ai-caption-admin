import { Box, Card, Checkbox, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, users, selectedUserIds, setSelectedUserIds, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map((user) => user.userId);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, userId) => {
    const selectedIndex = selectedUserIds.indexOf(userId);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, userId);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
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
                    checked={selectedUserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0
                      && selectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Password
                </TableCell>
                <TableCell>
                  Published
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.userId}
                  selected={selectedUserIds.indexOf(user.userId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(user.userId) !== -1}
                      onChange={(event) => handleSelectOne(event, user.userId)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {user.userId}
                  </TableCell>
                  <TableCell>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    {user.password}
                  </TableCell>
                  <TableCell>
                    {moment(parseInt(user.publishedDate, 10)).format('YYYY/MM/DD HH:MM:SS')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[100, 300, 500]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
