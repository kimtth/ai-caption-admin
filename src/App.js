import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import routes from './routes';
import theme from './theme';
import client from './api/apollo-client';
import { getAuth } from './api/inMemoryAuth';

const App = () => {
  const isLoggedIn = getAuth();
  const routing = useRoutes(routes(isLoggedIn));

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
