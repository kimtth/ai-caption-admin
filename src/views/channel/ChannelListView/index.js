import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Page from 'src/components/Page';
import { channelsQuery } from '../../../api/graph-queries';
import Results from './Results';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ChannelListView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(channelsQuery);
  const [selectedChannelIds, setSelectedChannelIds] = useState([]);
  const navigate = useNavigate()

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const channels = data ? data.channels : [];

  const handleReload = () => {
    // navigate('/app/channel', { replace: true });
    navigate(0);
  }

  return (
    <Page
      className={classes.root}
      title="Channels"
    >
      <Container maxWidth={false}>
        <Toolbar
          callback={handleReload}
          selectedChannelIds={selectedChannelIds}
        />
        <Box mt={3}>
          <Results
            channels={channels}
            selectedChannelIds={selectedChannelIds}
            setSelectedChannelIds={setSelectedChannelIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ChannelListView;
