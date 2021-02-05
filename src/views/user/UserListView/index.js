import { useQuery } from '@apollo/react-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import { usersQuery } from '../../../api/graph-queries';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(usersQuery);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const users = data ? data.users : [];

  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar
          selectedUserIds={selectedUserIds}
        />
        <Box mt={3}>
          <Results
            users={users}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSelectedUserIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
