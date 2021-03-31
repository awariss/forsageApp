<template>
  <Page>
  <ActionBar />
  <StackLayout class="form">
    <Label v-model="jwt" />
  <StackLayout class="input-field">
    <Label text="Email"/>
    <TextField class="input" v-model="emailValue" keyboardType="email" autocorrect="false" autocapitalizationType="none"></TextField>
  </StackLayout>

  <StackLayout class="input-field">
    <Label text="Heslo"/>
    <TextField class="input" v-model="password" secure="true" autocorrect="false" autocapitalizationType="none"></TextField>
  </StackLayout>

  <Button text="Přihlásit" @tap="login"></Button>
  <Button text="HivesS" @tap="hey"></Button>
  <Button text="Show" @tap="show"></Button>
  <Button text="Logout" @tap="logout"></Button>


</StackLayout>

</Page>
</template>

<script >
import { apolloClient } from "../main";
import * as authenticateUser from "../../graphql/authenticateUser";
import * as hives from "../../graphql/myHives";
import { Dialogs } from "@nativescript/core";
import { TextField } from "tns-core-modules/ui/text-field";

const appSettings = require("tns-core-modules/application-settings");

export default {
    methods: {

      show(){
        console.log(appSettings.getString("token"));
      },


      logout(){
        appSettings.remove("token");
      },

      hey(){
        apolloClient
        .query({
         // Query
         query: hives.HIVES,
         // Parameters

    })
       .then((data) => {
         // Result
         console.log(data);

       })
       .catch((error) => {
         // Error
         console.error(error);
       });

      },


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
        password:'',
        jwt:''
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
