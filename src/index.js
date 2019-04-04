//Importing Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { WebSocketLink } from 'apollo-link-ws'
import { GC_AUTH_TOKEN } from './constants';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, HttpLink} from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import './styles/App.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import * as serviceWorker from './serviceWorker';


//Establishing connection between React and Graphcool
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjtx74lnt1f630162lyygf7gi'
});

//Establishing connection with subscription API
const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjtx74lnt1f630162lyygf7gi`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN),
    }
  }
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})


const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

//Instantiating client object
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


//Rendering the App
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();
