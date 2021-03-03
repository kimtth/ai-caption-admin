import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import UserListView from './views/user/UserListView';
import ChannelListView from './views/channel/ChannelListView';
import MessageListView from './views/message/MessageListView';
import SpeechListView from './views/custom_speech/SpeechListView';
import NotFoundView from './views/errors/NotFoundView';
import DashboardView from './views/reports/DashboardView';
import SettingsView from './views/settings/SettingsView';

const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'user', element: <UserListView /> },
      { path: 'channel', element: <ChannelListView /> },
      { path: 'message', element: <MessageListView /> },
      { path: 'speech', element: <SpeechListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: isLoggedIn ? <Navigate to="/" /> : <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
