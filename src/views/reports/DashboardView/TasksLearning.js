import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography, makeStyles, colors } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { customCountQuery } from '../../../api/dialog-queries';
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TasksLearning = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dataCnt, setDataCnt] = useState({});
  const { loading, error, data: Count, refetch } = useQuery(customCountQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setDataCnt(Count?.customCnt);
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
              CUSTOM / TOTAL (%)
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {Math.round(dataCnt?.count * 100 / dataCnt?.totalCount)}%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              {`custom ${dataCnt?.count} / total ${dataCnt?.totalCount}`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={Math.round(dataCnt?.count * 100 / dataCnt?.totalCount)}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

TasksLearning.propTypes = {
  className: PropTypes.string
};

export default TasksLearning;
