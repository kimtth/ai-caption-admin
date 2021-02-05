import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { messagesQuery } from '../../../api/graph-queries';

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

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const messages = data ? data.messages : [];

  return (
    <Page
      className={classes.root}
      title="Messages"
    >
      <Container maxWidth={false}>
        <Toolbar
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
