import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useQuery } from '@apollo/react-hooks';
import { customQuery } from '../../../api/graph-queries';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SpeechListView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [listData, setlistData] = useState([]);
  const [selectedCustomIds, setSelectedCustomIds] = useState([]);
  const { loading, error, data, refetch } = useQuery(customQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      loadData()
    }
  });

  const loadData = () => {
    setlistData(data ? data.customs : []);
    // Kim: I could not find a reason why refreshing of page is not working when only calling a navigate one time.
    navigate('/app', { replace: true })
    navigate('/app/speech', { replace: true })
  }

  return (
    <Page
      className={classes.root}
      title="Customs"
    >
      <Container maxWidth={false}>
        <Toolbar
          customs={listData}
          selectedCustomIds={selectedCustomIds}
        />
        <Box mt={3}>
          <Results
            customs={listData}
            selectedCustomIds={selectedCustomIds}
            setSelectedCustomIds={setSelectedCustomIds}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default SpeechListView;
