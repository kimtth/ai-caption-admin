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
  const [listData, setlistData] = useState([]);
  const [dialogError, setDialogError] = useState('');
  const [filter, setFilter] = useState({
    criteria: '',
    keyword: ''
  })
  const { loading, error, data, refetch } = useQuery(usersQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      loadData()
    }
  });
  const { loading: loadingMany, error: errorMany, data: dataMany, refetch: refetchMany } = useQuery(userManyQuery, {
    variables: { filter: filter },
    skip: filterOn === false,
    onCompleted: () => {
      loadData()
    }
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const navigate = useNavigate()

  if (loading || loadingMany) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (errorMany) return `Error! ${errorMany.message}`;
  if (dialogError) return `Error! ${dialogError}`;

  const loadData = () => {
    if (filterOn) {
      setlistData(dataMany ? dataMany.user_many : []);
    } else {
      setlistData(data ? data.users : []);
    }
    // Kim: I could not find a reason why refreshing of page is not working when only calling a navigate one time.
    navigate('/app', { replace: true })
    navigate('/app/user', { replace: true })
  }

  const handleReload = async () => {
    const rtn = await refetch();
    if (rtn) {
      loadData();
    }
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
          setDialogError={setDialogError}
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
