import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Link, Card, CardContent, Grid, Typography, colors, makeStyles } from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();

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
              TOTAL COST
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              <Link
                href="https://portal.azure.com/#blade/Microsoft_Azure_CostManagement/Menu/overview"
                color="inherit"
                target="_blank">
                Cost Management
              </Link>
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              {"Redirect link to Azure"}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
