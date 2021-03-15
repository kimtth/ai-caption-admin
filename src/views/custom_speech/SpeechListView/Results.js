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

const Results = ({ className, customs, selectedCustomIds, setSelectedCustomIds, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleSelectAll = (event) => {
    let newSelectedCustomIds;

    if (event.target.checked) {
      newSelectedCustomIds = customs.map((custom) => custom.id);
    } else {
      newSelectedCustomIds = [];
    }

    setSelectedCustomIds(newSelectedCustomIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomIds.indexOf(id);
    let newSelectedCustomIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomIds = newSelectedCustomIds.concat(selectedCustomIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomIds = newSelectedCustomIds.concat(selectedCustomIds.slice(1));
    } else if (selectedIndex === selectedCustomIds.length - 1) {
      newSelectedCustomIds = newSelectedCustomIds.concat(selectedCustomIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomIds = newSelectedCustomIds.concat(
        selectedCustomIds.slice(0, selectedIndex),
        selectedCustomIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomIds(newSelectedCustomIds);
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
                    checked={selectedCustomIds.length === customs.length}
                    color="primary"
                    indeterminate={
                      selectedCustomIds.length > 0
                      && selectedCustomIds.length < customs.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Custom Id
                </TableCell>
                <TableCell width="5%">
                  Type
                </TableCell>
                <TableCell>
                  Reference Id
                </TableCell>
                <TableCell>
                  Value
                </TableCell>
                {/* <TableCell>
                  Stream
                </TableCell> */}
                <TableCell>
                  Published
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((custom) => (
                <TableRow
                  hover
                  key={custom.id}
                  selected={selectedCustomIds.indexOf(custom.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomIds.indexOf(custom.id) !== -1}
                      onChange={(event) => handleSelectOne(event, custom.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {custom.id}
                  </TableCell>
                  <TableCell>
                    {custom.type}
                  </TableCell>
                  <TableCell>
                    {custom.refId}
                  </TableCell>
                  <TableCell>
                    {custom.value}
                  </TableCell>
                  {/* <TableCell>
                    {custom.stream.slice(0, 50)}...
                  </TableCell> */}
                  <TableCell>
                    {moment(parseInt(custom.publishedDate, 10)).format('YYYY/MM/DD HH:MM:SS')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customs.length}
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
  customs: PropTypes.array.isRequired
};

export default Results;
