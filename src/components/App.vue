<template>
    <Page>
        <ActionBar title="Forsage App" />

        <GridLayout columns="*" rows="*">
        <WebView src="https://app.forsage.net/" />

        <Button text="Your token" @tap="doGetCurrentPushToken"> </Button>

        </GridLayout>
    </Page>
</template>

<script >
import { Dialogs } from "@nativescript/core";

var firebase = require("@nativescript/firebase").firebase;

export default {
    methods: {

    showSideDrawer() {
      console.log("Show SideDrawer tapped.");
      // Show sidedrawer ...
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
        msg: 'Hello World!',
    }
  }
}

</script>

<style scoped>
    ActionBar {
      background-color: #ffc107;
      color: #000000;
    }
    Button {
      background-color: #ffc107;
      border: none;
      color: #ffffff;
      padding: 15px 32px;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      position:relative;
      margin-top:90%;
      margin-left:80%;
      width:20%;
      border-radius:20px;
    }
</style>
