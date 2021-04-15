<template>
  <Page>
    <ActionB />
    <StackLayout>
      <Button text="SCAN" @tap="tap"></Button>
    </StackLayout>
  </Page>
</template>

<script >

import { Dialogs } from "@nativescript/core";
import ActionB from './ActionBar'
import { Bluetooth } from '@nativescript-community/ble';

const appSettings = require("tns-core-modules/application-settings");
var bluetooth = new Bluetooth();

export default {

    components: {
       ActionB
    },

    methods: {

      scan(){
        console.log("sadas");
        bluetooth.startScanning({
        seconds: 1,
        onDiscovered: function (peripheral) {
        	console.log(peripheral);
          }
        }).then(function() {
          console.log("scanning complete");
        }, function (err) {
          console.log("error while scanning: " + err);
        });
      },

      connectBluetooth(){
        console.log("start connectiong")
        bluetooth.connect({
        UUID: '02:EC:38:BF:94:73',
        onConnected: function (peripheral) {
        	console.log("Periperhal connected with UUID: " + peripheral.UUID);

        	// the peripheral object now has a list of available services:
        	peripheral.services.forEach(function(service) {
        	  console.log("service found: " + JSON.stringify(service));
         });
        },
        onDisconnected: function (peripheral) {
        	console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
        }
      });
      },

      enabledBluetooth(){
        bluetooth.isBluetoothEnabled().then(
        function(enabled) {
          console.log("Enabled? " + enabled);
          if(!enabled){
            Dialogs.alert({
              title: "Bluetooth",
              message: "Prosím zapněte Bluetooth",
              okButtonText: "Zavřít"
            });
          }
          else{
            console.log("scan");
            this.scan();
          };
        });
      },

      tap(){
        this.enabledBluetooth();
        this.scan();
        }
    },


  data() {
      return {
        senzorId: []
    }
  }
}

</script>

<style scoped>

Button{
  background-color: #ffc107;
  border: none;
  color: #ffffff;
  border-radius:20%;
  width:30%;
  height:7%;
  padding-top:5%;
}


</style>
