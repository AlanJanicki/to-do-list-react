import React from 'react';
import { createRoot } from 'react-dom/client';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4002/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);
