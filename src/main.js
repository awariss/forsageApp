/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

import Vue from "nativescript-vue";
import Bluetooth from "./components/Bluetooth";
import Login from "./components/Login";
import VueDevtools from "nativescript-vue-devtools";

import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo); // for GraphQl mutation

const appSettings = require("tns-core-modules/application-settings"); //local storage

//make link for graphql
const httpLink = createHttpLink({
  uri: "https://api.forsage.net/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = appSettings.getString("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();

//make apolloClient
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

//make apolloProvider
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

var firebase = require("@nativescript/firebase").firebase;  //setup Firebase

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
import store from "./store";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

//generate FCM token
firebase
  .init({
    onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    }
  })
  .then(
    function() {
      console.log("firebase.init done");
    },
    function(error) {
      console.log("firebase.init error: " + error);
    }
  );

new Vue({
  store,
  apolloProvider,
  render: h => h("frame", [h(Login)])
}).$start();
