

<template>
  <Page>
  <ActionB />
  <StackLayout class="form">
  <StackLayout class="input-field">
    <Label text="Email"/>
    <TextField class="input" v-model="emailValue" keyboardType="email" autocorrect="false" autocapitalizationType="none"></TextField>
  </StackLayout>

  <StackLayout class="input-field">
    <Label text="Heslo"/>
    <TextField class="input" v-model="password" secure="true" autocorrect="false" autocapitalizationType="none"></TextField>
  </StackLayout>

  <Button text="Přihlásit" @tap="login"></Button>
</StackLayout>

</Page>
</template>

<script >

import ActionB from './ActionBar'
import App from './App'
import { apolloClient } from "../main";
import * as authenticateUser from "../../graphql/authenticateUser";
import { Dialogs } from "@nativescript/core";
import { TextField } from "tns-core-modules/ui/text-field";

const appSettings = require("tns-core-modules/application-settings");

export default {

    components: {
       ActionB
    },

    methods: {

      login(){

        console.log(String(this.emailValue));
        console.log(this.password);

        apolloClient
        .mutate({
         // Query
         mutation: authenticateUser.LOGIN,
         // Parameters
         variables: {
           /*email : this.emailValue,
           password : this.password,*/
           email : "demo@forsage.net",
           password : "forsagedemo",
         },
    })
       .then((data) => {
         // Result
         console.log(data);
         console.log(data.data.authenticateUser.jwt);
         appSettings.setString('token',data.data.authenticateUser.jwt);
         this.$navigateTo(App);
       })
       .catch((error) => {
         // Error
         console.error(error);
         Dialogs.alert({
           title: "Přihlášení",
           message: "Špatné přihlašovací údaje",
           okButtonText: "Zavřít"
         });
       });


   },
  },

    data() {
      return {
        emailValue: '',
        password:'',
    }
  }
}

</script>

<style scoped>

ActionBar {
  background-color: #ffc107;
  color: #000000;
}

TextField {
  color: #000000;
  background-color: #d9dddc;
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

Button {
  background-color: #ffc107;
  border: none;
  color: #ffffff;
  }

</style>
