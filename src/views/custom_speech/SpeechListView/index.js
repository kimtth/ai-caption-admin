import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
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
  const [dialogError, setDialogError] = useState('');
  const [selectedCustomIds, setSelectedCustomIds] = useState([]);
  const { loading, error, data, refetch } = useQuery(customQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      loadData()
    }
  });

  if (dialogError) return `Error! ${dialogError}`;

  const loadData = () => {
    setlistData(data ? data.customs : []);
    // Kim: I could not find a reason why refreshing of page is not working when only calling a navigate one time.
    navigate('/app', { replace: true })
    navigate('/app/speech', { replace: true })
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
      title="Customs"
    >
      <Container maxWidth={false}>
        <Toolbar
          callback={handleReload}
          customs={listData}
          selectedCustomIds={selectedCustomIds}
          setDialogError={setDialogError}
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
