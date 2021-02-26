import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, Typography, colors, makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { totalUserCountQuery, userDifferenceCountQuery } from '../../../api/dialog-queries';
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalUsers = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dataCnt, setDataCnt] = useState({});
  const [diffCnt, setDiffCnt] = useState({});
  const { loading, error, data: Count } = useQuery(totalUserCountQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setDataCnt(Count?.userCnt);
    }
  });
  const { loading: loadingDiff, error: errorDiff, data: CountDiff } = useQuery(userDifferenceCountQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      console.log(CountDiff);
      setDiffCnt(CountDiff?.userDiffCnt);
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
              TOTAL USER
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {dataCnt ? dataCnt.count : '-'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {diffCnt ? Math.round(diffCnt.count * 100 / dataCnt.count) : '-'} %
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month (from Today)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
