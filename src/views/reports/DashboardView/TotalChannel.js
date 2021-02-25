import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography, makeStyles, colors } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { totalChannelCountQuery } from '../../../api/dialog-queries';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalChannel = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dataCnt, setDataCnt] = useState({});
  const { loading, error, data: Count, refetch } = useQuery(totalChannelCountQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setDataCnt(Count?.channelCnt);
    }
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL CHANNEL (PUB)
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {dataCnt? dataCnt.count : '-'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MeetingRoomIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalChannel.propTypes = {
  className: PropTypes.string
};

export default TotalChannel;
