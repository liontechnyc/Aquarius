import ApolloClient, { Operation } from 'apollo-boost';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

const cache = new InMemoryCache();

const defaultCacheState = {
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
};

const authMiddleware = ({ setContext }: Operation): void => {
  const token = localStorage.getItem('token');
  setContext({
    headers: {
      authorization: token ? `Bearer ${localStorage.getItem('token')}` : '',
    },
  });
};

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: `${process.env.API_URI}/graphql`,
  credentials: 'include',
  request: authMiddleware,
  cache,
  fetch,
});

// ? Logout behavior
client.onResetStore(async () => {
  cache.writeData(defaultCacheState);
});

// ? Initialize cache on init
cache.writeData(defaultCacheState);

export default client;
