<template>
  <Page>
  <ActionBar />
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
import { apolloClient } from "../main";
import * as autenticateUser from "../../graphql/authenticateUser";
import { Dialogs } from "@nativescript/core";
import { TextField } from "tns-core-modules/ui/text-field";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
    methods: {

      login(){

        var jwt;

        console.log(String(this.emailValue));
        console.log(this.password);

        apolloClient
        .mutate({
         // Query
         mutation: autenticateUser.LOGIN,
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
         jwt = data.data.authenticateUser.jwt;
         console.log(data.data.authenticateUser.jwt);

       })
       .catch((error) => {
         // Error
         console.error(error);
       });

      
   },
  },



    data() {
      return {
        emailValue: '',
        password:''
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

</style>
