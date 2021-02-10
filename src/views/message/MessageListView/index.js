import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { messagesQuery } from '../../../api/graph-queries';
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
  const { loading, error, data } = useQuery(messagesQuery);
  const [selectedMessageIds, setSelectedMessageIds] = useState([]);
  const navigate = useNavigate()

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const messages = data ? data.messages : [];

  const handleReload = () => {
    // navigate('/app/message', { replace: true });
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
          selectedMessageIds={selectedMessageIds}
        />
        <Box mt={3}>
          <Results
            messages={messages}
            selectedMessageIds={selectedMessageIds}
            setSelectedMessageIds={setSelectedMessageIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default MessageListView;
