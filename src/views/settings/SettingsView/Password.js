import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, Grid, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userOneQuery } from 'src/api/graph-queries';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const userId = useSelector(state => state.metas.userId);
  const { loading, error, data } = useQuery(userOneQuery, {
    variables: { userId: userId },
    skip: !userId
  });

  React.useEffect(() => {
    if (data) {
      setValues(data?.user);
    }
  }, [data])

  if (error) return `Error! ${error.message}`;

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Settings"
          subheader="User Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Typography variant="subtitle1">User ID: </Typography>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="User Id"
                margin="normal"
                name="userid"
                value={userId}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle1">User Name: </Typography>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="User Name"
                margin="normal"
                name="username"
                value={values.username}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle1">Password: </Typography>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="password"
                margin="normal"
                name="password"
                value={values.password}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
