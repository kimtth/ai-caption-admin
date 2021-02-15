import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_ENDPOINT } from './Constants'

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
