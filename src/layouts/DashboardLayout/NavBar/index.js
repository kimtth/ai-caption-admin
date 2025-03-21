import { Box, Drawer, Hidden, List, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { BarChart as BarChartIcon, MessageSquare as MessageIcon, Voicemail, Settings as SettingsIcon, User as UserIcon, Users as UsersIcon } from 'react-feather';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/user',
    icon: UserIcon,
    title: 'Users'
  },
  {
    href: '/app/channel',
    icon: UsersIcon,
    title: 'Channels'
  },
  {
    href: '/app/message',
    icon: MessageIcon,
    title: 'Messages'
  },
  {
    href: '/app/speech',
    icon: Voicemail,
    title: 'Custom'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Useful Links'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
