import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Page from 'src/components/Page';
import { channelsQuery, channelManyQuery } from '../../../api/graph-queries';
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
  const [filterOn, setFilterOn] = useState(false);
  const [filter, setFilter] = useState({
    criteria: '',
    keyword: ''
  })
  const { loading, error, data } = useQuery(channelsQuery);
  const { loading: loadingMany, error: errorMany, data: dataMany } = useQuery(channelManyQuery, {
    variables: { filter: filter },
    skip: filterOn === false
  });
  const [selectedChannelIds, setSelectedChannelIds] = useState([]);
  const navigate = useNavigate()

  if (loading || loadingMany) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (errorMany) return `Error! ${errorMany.message}`;

  let listData = []
  if (filterOn) {
    listData = dataMany ? dataMany.channel_many : [];
  } else {
    listData = data ? data.channels : [];
  }

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
          setFilter={setFilter}
          setFilterOn={setFilterOn}
          selectedChannelIds={selectedChannelIds}
        />
        <Box mt={3}>
          <Results
            channels={listData}
            selectedChannelIds={selectedChannelIds}
            setSelectedChannelIds={setSelectedChannelIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ChannelListView;
