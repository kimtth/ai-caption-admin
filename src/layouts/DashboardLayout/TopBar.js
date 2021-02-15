import { AppBar, Box, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { isLoggedIn, setAuth } from 'src/api/Constants';
import Logo from 'src/components/Logo';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onSignOut = () => {
    console.log('sign-out');
    setAuth(false);
    navigate('/', { replace: true });
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Typography variant="h4">Tata Consultancy Services AI-Caption Portal</Typography>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton
            color="inherit"
            onClick={onSignOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
