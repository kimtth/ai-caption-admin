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
  const [filter, setFilter] = useState({
    criteria: '',
    keyword: ''
  })
  const { loading, error, data } = useQuery(messagesQuery);
  const { loading: loadingMany, error: errorMany, data: dataMany } = useQuery(messageManyQuery, {
    variables: { filter: filter },
    skip: filterOn === false
  });
  const [selectedMessageIds, setSelectedMessageIds] = useState([]);
  const navigate = useNavigate()

  if (loading || loadingMany) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (errorMany) return `Error! ${errorMany.message}`;

  let listData = []
  if (filterOn) {
    listData = dataMany ? dataMany.message_many : [];
  } else {
    listData = data ? data.messages : [];
  }

  const handleReload = () => {
    navigate(0);
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
