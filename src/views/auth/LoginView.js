import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, setAuth } from 'src/api/Constants';
import Page from 'src/components/Page';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLoggedIn)
    setAuth(true);
    navigate('/app/dashboard', { replace: true });
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
            name="email"
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
