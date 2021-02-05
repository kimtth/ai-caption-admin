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

const Results = ({ className, messages, selectedMessageIds, setSelectedMessageIds, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedMessageIds;

    if (event.target.checked) {
      newSelectedMessageIds = messages.map((message) => message.id);
    } else {
      newSelectedMessageIds = [];
    }

    setSelectedMessageIds(newSelectedMessageIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMessageIds.indexOf(id);
    let newSelectedMessageIds = [];

    if (selectedIndex === -1) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds.slice(1));
    } else if (selectedIndex === selectedMessageIds.length - 1) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMessageIds = newSelectedMessageIds.concat(
        selectedMessageIds.slice(0, selectedIndex),
        selectedMessageIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMessageIds(newSelectedMessageIds);
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
                    checked={selectedMessageIds.length === messages.length}
                    color="primary"
                    indeterminate={
                      selectedMessageIds.length > 0
                      && selectedMessageIds.length < messages.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Channel Id
                </TableCell>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Recognized
                </TableCell>
                <TableCell>
                  Translate
                </TableCell>
                <TableCell>
                  Audio Record
                </TableCell>
                <TableCell>
                  Published
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.slice(0, limit).map((message) => (
                <TableRow
                  hover
                  key={message.id}
                  selected={selectedMessageIds.indexOf(message.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMessageIds.indexOf(message.id) !== -1}
                      onChange={(event) => handleSelectOne(event, message.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {message.channelId}
                  </TableCell>
                  <TableCell style={{ maxWidth: '110px', overflowWrap: 'break-word' }}>
                    {message.userId}
                  </TableCell>
                  <TableCell>
                    {message.conversationText}
                  </TableCell>
                  <TableCell>
                    {message.translateText}
                  </TableCell>
                  <TableCell>
                    {message.isAudioRecord ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {moment(parseInt(message.publishedDate, 10)).format('YYYY/MM/DD HH:MM:SS')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={messages.length}
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
  messages: PropTypes.array.isRequired
};

export default Results;
