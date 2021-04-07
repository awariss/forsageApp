<template>
    <Page @loaded="makeUrl">
      <ActionB />

        <StackLayout>
        <Label v-model=this.url />
        <Button text="Show Pcm" @tap="doGetCurrentPushToken"></Button>
        <Button text="Show Jwt" @tap="show"></Button>
        <Button text="Odhlásit" @tap="logout"></Button>

      </StackLayout>
    </Page>
</template>

<script >
import { Dialogs } from "@nativescript/core";
import Login from './Login';
import ActionB from './ActionBar';
import { apolloClient } from "../main";
import * as hives from "../../graphql/myHives";



var firebase = require("@nativescript/firebase").firebase;

const appSettings = require("tns-core-modules/application-settings");


export default {

    components: {
       ActionB
    },

    methods: {

      makeUrl(){
        this.url="https://app.forsage.net/login?jwt="+appSettings.getString('token');
      },

      show(){
        Dialogs.alert({
          title: "JWT token",
          message: appSettings.getString("token"),
          okButtonText: "Close"
        }).then(function () {
          console.log("Dialog closed!");
        });
      },

      logout(){
        appSettings.remove("token");
        this.$navigateTo(Login);
      },


    doGetCurrentPushToken() {
    firebase.getCurrentPushToken().then(function (token) {
      // may be null if not known yet
      console.log("Current push token: " + token);
      Dialogs.alert({
        title: "Your token",
        message: token,
        okButtonText: "Close"
      }).then(function () {
        console.log("Dialog closed!");
      });

      dialogs.alert({
        title: "Current Push Token",
        message: (token === null ? "Not received yet" : token),
        okButtonText: "OK, thx"
      });
    });
  },
},

    data() {
      return {
        url:'',
    };
  }
}

</script>

<style scoped>
    Button {
      background-color: #ffc107;
      border: none;
      color: #ffffff;
      }
</style>
