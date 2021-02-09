import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
