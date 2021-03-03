import { AppBar, Box, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth-client';
import Logo from '../../components/Logo';
import { removeAuth } from '../../api/inMemoryAuth';

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

  const onSignOut = (e) => {
    e.preventDefault();
    console.log('sign-out');
    removeAuth();
    if(logout()){
      navigate('/', { replace: true });
    }
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
