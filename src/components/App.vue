<template>
    <Page>
        <ActionBar title="Forsage App"/>
        <GridLayout columns="*" rows="*">
        <Button text="Here man!" @tap="onButtonTap"> </Button>
        </GridLayout>
    </Page>
</template>

<script >
import { Dialogs } from "@nativescript/core";


export default {
    methods: {
    
    doGetCurrentPushToken() {
    firebase.getCurrentPushToken().then(function (token) {
      // may be null if not known yet
      console.log("Current push token: " + token);
      dialogs.alert({
        title: "Current Push Token",
        message: (token === null ? "Not received yet" : token),
        okButtonText: "OK, thx"
      });
    });
    
    
      onButtonTap() {
        console.log("Button was pressed");
        Dialogs.alert({
          title: "Your token",
          message: this.token,
          okButtonText: "Close"
        }).then(function () {
          console.log("Dialog closed!");
        });

    },
  },

    data() {
      return {
        msg: 'Hello World!',
        token: 'token number'
    }
  }
}
</script>

<style scoped>
    ActionBar {
      background-color: #ffd300;
      color: #000000;
    }
    Button {
      background-color: #ffd300;
      border: none;
      color: #ffffff;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
</style>
