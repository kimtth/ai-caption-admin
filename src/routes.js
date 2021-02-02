import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import UserListView from 'src/views/user/UserListView';
import ChannelListView from 'src/views/channel/ChannelListView';
import MessageListView from 'src/views/message/MessageListView';
import SpeechListView from 'src/views/custom_speech/SpeechListView';
import NotFoundView from 'src/views/errors/NotFoundView';
import DashboardView from 'src/views/reports/DashboardView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = (isLoggedIn) => [
  {
    path: 'app',
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
