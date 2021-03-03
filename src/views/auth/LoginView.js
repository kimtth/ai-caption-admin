import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth-client';
import { setAuth } from '../../api/inMemoryAuth';
import Page from '../../components/Page';
import { setUserId } from '../../context/metaContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ userId: "", password: "" });

  const dispatch = useDispatch();
  const onUserId = React.useCallback((value) => dispatch(setUserId(value)), [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proceed = await login(user);
    if(proceed){
      setAuth(true);
      onUserId(user.userId);
      navigate('/app/dashboard', { replace: true });
    } else {
      alert('Authentication required');
    }
    setUser({ userId: "", password: "" })
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Sign in
                  </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TCS AI-Caption Portal
                  </Typography>
          </Box>
          <Box
            mt={3}
            mb={1}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              Login with email address
                  </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="userId"
            onChange={(event) =>
              setUser({
                ...user,
                [event.target.name]: event.target.value,
              })
            }
            type="email"
            value={user.userId}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(event) =>
              setUser({
                ...user,
                [event.target.name]: event.target.value,
              })
            }
            type="password"
            value={user.password}
            variant="outlined"
            autoComplete="off"
          />
          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="button"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
              </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
