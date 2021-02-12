import { useQuery } from '@apollo/react-hooks';
import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import { usersQuery, userManyQuery } from '../../../api/graph-queries';
import Results from './Results';
import Toolbar from './Toolbar';
import { useNavigate } from "react-router-dom";

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
  const [filterOn, setFilterOn] = useState(false);
  const [filter, setFilter] = useState({
    criteria: '',
    keyword: ''
  })
  const { loading, error, data } = useQuery(usersQuery);
  const { loading: loadingMany, error: errorMany, data: dataMany } = useQuery(userManyQuery, {
    variables: { filter: filter },
    skip: filterOn === false
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const navigate = useNavigate()

  if (loading || loadingMany) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (errorMany) return `Error! ${errorMany.message}`;

  let listData = []
  if (filterOn) {
    listData = dataMany ? dataMany.user_many : [];
  } else {
    listData = data ? data.users : [];
  }

  const handleReload = () => {
    navigate(0);
  }

  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar
          callback={handleReload}
          setFilter={setFilter}
          setFilterOn={setFilterOn}
          selectedUserIds={selectedUserIds}
        />
        <Box mt={3}>
          <Results
            users={listData}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSelectedUserIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
