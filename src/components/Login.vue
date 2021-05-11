<template>
  <Page @loaded="checkJwt">
    <ActionB />
    <StackLayout class="form">
      <Image src="~/assets/images/logo_black.png" stretch="aspectFit" />
      <StackLayout class="input-field">
        <Label text="Email" />
        <TextField
          class="input"
          v-model="emailValue"
          keyboardType="email"
          autocorrect="false"
          autocapitalizationType="none"
        ></TextField>
      </StackLayout>

      <StackLayout class="input-field">
        <Label text="Heslo" />
        <TextField
          class="input"
          v-model="password"
          secure="true"
          autocorrect="false"
          autocapitalizationType="none"
        ></TextField>
      </StackLayout>
      <Button text="Přihlásit" @tap="login"></Button>
      <Button text="Nemáte účet?" class="register" @tap="register"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import ActionB from "./ActionBar";
import Web from "./Web";
import Register from "./Register";
import { apolloClient } from "../main";

import * as authenticateUser from "../../graphql/authenticateUser";
import * as registePushNotificationToken from "../../graphql/registerPushNotificationToken";

import { Dialogs } from "@nativescript/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { Utils } from "@nativescript/core";

const appSettings = require("tns-core-modules/application-settings");
const firebase = require("@nativescript/firebase").firebase;

export default {
  components: {
    ActionB
  },

  methods: {
    register() {
      this.$navigateTo(Register);
    },

    checkJwt() {
      if (appSettings.hasKey("token")) {
        this.$navigateTo(Web);
      }
    },

    savePushNotificationTokenToServer() {
      firebase.getCurrentPushToken().then(token => {
        console.log("Current push token: " + token);

        apolloClient
          .mutate({
            // Query
            mutation: registePushNotificationToken.REGISTER_TOKEN,
            // Parameters
            variables: {
              pushToken: token
            }
          })
          .then(data => {
            // Result
            //  console.log(data);
          })
          .catch(error => {
            // Error
            console.error(error);
          });
      });
    },

    login() {
      if (this.email == "" || this.password == "") {
        Dialogs.alert({
          title: "Přihlášení",
          message: "Prázdné pole pro přihlašovací údaje",
          okButtonText: "Zavřít"
        });
        return;
      }

      apolloClient
        .mutate({
          // Query
          mutation: authenticateUser.LOGIN,
          // Parameters
          variables: {
            email: this.emailValue,
            password: this.password
          }
        })
        .then(data => {
          // Result
          appSettings.setString("token", data.data.authenticateUser.jwt);
          this.savePushNotificationTokenToServer();
          this.$navigateTo(Web);
        })
        .catch(error => {
          // Error
          console.error(error);
          if (error == "Error: Network error: Network request failed") {
            Dialogs.alert({
              title: "Bez připojení k internet",
              message: "Prosím, připojte se.",
              okButtonText: "Zavřít"
            });
          } else {
            Dialogs.alert({
              title: "Přihlášení",
              message: "Špatné přihlašovací údaje",
              okButtonText: "Zavřít"
            });
          }
        });
    }
  },

  data() {
    return {
      emailValue: "",
      password: ""
    };
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #ffc107;
  color: #000000;
}

TextField {
  color: #000000;
  background-color: #d9dddc;
  padding-left: 5%;
}

.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.register {
  background: #ffffff;
  color: #000000;
}

button {
  background-color: #ffc107;
  border: none;
  color: #ffffff;
}
</style>
