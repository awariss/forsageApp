import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

var firebase = require("@nativescript/firebase").firebase;

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

firebase.init({

  /*firebase.login(
  {
    type: firebase.LoginType.ANONYMOUS
  })
  .then(user => console.log("User uid: " + user.uid))
  .catch(error => console.log("Trouble in paradise: " + error));*/

  onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    },

  onMessageReceivedCallback: function(message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        // if your server passed a custom property called 'foo', then do this:
        console.log("Value of 'foo': " + message.data.foo);
      }

  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
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
  render: h => h('frame', [h(App)])
}).$start()
