import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { messagesQuery, messageManyQuery } from '../../../api/graph-queries';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MessageListView = () => {
  const classes = useStyles();
  const [filterOn, setFilterOn] = useState(false);
  const [listData, setlistData] = useState([]);
  const [dialogError, setDialogError] = useState('');
  const [filter, setFilter] = useState({
    criteria: '',
    keyword: ''
  })
  const { loading, error, data, refetch } = useQuery(messagesQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      loadData()
    }
  });
  const { loading: loadingMany, error: errorMany, data: dataMany, refetch: refetchMany } = useQuery(messageManyQuery, {
    variables: { filter: filter },
    skip: filterOn === false,
    onCompleted: () => {
      loadData()
    }
  });
  const [selectedMessageIds, setSelectedMessageIds] = useState([]);
  const navigate = useNavigate()

  if (loading || loadingMany) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (errorMany) return `Error! ${errorMany.message}`;
  if (dialogError) return `Error! ${dialogError}`;

  const loadData = () => {
    if (filterOn) {
      setlistData(dataMany ? dataMany.message_many : []);
    } else {
      setlistData(data ? data.messages : []);
    }
    // Kim: I could not find a reason why refreshing of page is not working when only calling a navigate one time.
    navigate('/app', { replace: true })
    navigate('/app/message', { replace: true })
  }

  const handleReload = async() => {
    const rtn = await refetch();
    if (rtn) {
      loadData();
    }
  }

  return (
    <Page
      className={classes.root}
      title="Messages"
    >
      <Container maxWidth={false}>
        <Toolbar
          callback={handleReload}
          setFilter={setFilter}
          setFilterOn={setFilterOn}
          selectedMessageIds={selectedMessageIds}
          setDialogError={setDialogError}
        />
        <Box mt={3}>
          <Results
            messages={listData}
            selectedMessageIds={selectedMessageIds}
            setSelectedMessageIds={setSelectedMessageIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default MessageListView;
