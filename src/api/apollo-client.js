import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { GRAPH_API_ENDPOINT } from './Constants';

const httpLink = new HttpLink({ uri: GRAPH_API_ENDPOINT, credentials: 'include' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
