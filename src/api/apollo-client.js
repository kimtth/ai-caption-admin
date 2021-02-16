import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { GRAPH_API_ENDPOINT } from './Constants';
import { getAccessToken } from './auth-client';

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    if (token) {
      operation.setContext({headers: {'authorization': `Bearer ${token}`}});
    }
    return forward(operation);
  }),
  new HttpLink({uri: GRAPH_API_ENDPOINT})
]);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
