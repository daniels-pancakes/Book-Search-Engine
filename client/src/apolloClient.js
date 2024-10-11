// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',  // Make sure this matches your server URL
  cache: new InMemoryCache(),
});

export default client;