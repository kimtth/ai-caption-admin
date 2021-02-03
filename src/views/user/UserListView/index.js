/* eslint-disable */ 
import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useQuery } from '@apollo/react-hooks';
import { usersQuery } from '../../../api/graph-queries';
import Results from './Results';
import Toolbar from './Toolbar';
import dataDemo from './data';

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

  if (loading) return `Loading...`;
  if (error) return `Error! ${error.message}`;

  let users = data ? data.users : [];
  console.log(users, users.length)

  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results users={users} />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
