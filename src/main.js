import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'
import VueDevtools from 'nativescript-vue-devtools'

import VueApollo from "vue-apollo"
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from 'apollo-cache-inmemory'


Vue.use(VueApollo);

const appSettings = require("tns-core-modules/application-settings");

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.forsage.net/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = appSettings.getString('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});



var firebase = require("@nativescript/firebase").firebase;

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

firebase.init({


  onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    },

}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

new Vue({
  store,
  apolloProvider,
  render: h => h('frame', [h(Login)])

}).$start()
