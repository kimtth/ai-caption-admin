import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { isLoggedIn } from 'src/api/Constants';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import theme from 'src/theme';
import client from './api/apollo-client';

const App = () => {
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
