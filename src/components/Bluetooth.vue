/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

<template>
  <Page @loaded="takeDataHives">
    <ActionB />
    <StackLayout>
      <Button text="Vyhledat senzory" @tap="tap"></Button>
      <ActivityIndicator :busy="this.busy" />

      <ListView for="senzor in senzors" @itemTap="onItemTap">
        <v-template>
          <GridLayout
            columns="auto,*, *"
            rows="*,*,*"
            borderRadius="5"
            boxShadow="10 5 5"
          >
            <Image
              row="0"
              col="0"
              rowSpan="3"
              src="~/assets/images/senzor.png"
              class="sen"
              backgroundColor="#ffc107"
              strech="aspectFit"
            />

            <Label
              row="0"
              col="1"
              class="sname"
              :text="senzor.senzorName"
              width="50%"
            />

            <FlexboxLayout
              row="1"
              col="1"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                class="icon"
                src="~/assets/images/hive.png"
                strech="aspectFit"
              />
              <Label :text="senzor.hiveName" width="80%" />
            </FlexboxLayout>

            <Label
              row="2"
              col="1"
              :text="senzor.siteName"
              class="site"
              width="50%"
            />

            <FlexboxLayout
              row="0"
              col="2"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                class="icon"
                src="~/assets/images/tem.png"
                strech="aspectFit"
              />
              <Label :text="senzor.temperature + ' °C'" width="80%" />
            </FlexboxLayout>

            <FlexboxLayout
              row="1"
              col="2"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                class="icon"
                src="~/assets/images/hum.png"
                strech="aspectFit"
              />
              <Label :text="senzor.humidity + ' %'" width="80%" />
            </FlexboxLayout>

            <FlexboxLayout
              row="2"
              col="2"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                class="icon"
                src="~/assets/images/battery.png"
                strech="aspectFit"
              />
              <Label :text="senzor.voltage + ' V'" width="80%" />
            </FlexboxLayout>
          </GridLayout>
        </v-template>
      </ListView>

      <Button text="Zpět" @tap="back"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import { Dialogs } from "@nativescript/core";
import ActionB from "./ActionBar";
import Detail from "./Detail";
import Web from "./Web";
import { Bluetooth } from "@nativescript-community/ble";
import { apolloClient } from "../main";
import * as myHives from "../../graphql/myHives";

const appSettings = require("tns-core-modules/application-settings");   // local storage
var bluetooth = new Bluetooth();
var timer = require("timer");

export default {
  components: {
    ActionB
  },

  methods: {
    //stop call scan function
    stop() {
      clearInterval(this.interval);
    },

    //open detail of senzores
    onItemTap(event) {
      this.$showModal(Detail, { props: { senzor: event.item } });
    },

    //make mac from uuid
    makeMac(uuid) {
      return (
        "0000" +
        uuid.substring(0, 2) +
        uuid.substring(3, 5) +
        uuid.substring(6, 8) +
        uuid.substring(9, 11) +
        uuid.substring(12, 14) +
        uuid.substring(15, 17)
      );
    },

    //return true if uuid in array in your senzores
    isSenzorYour(uuid) {
      let is = false;
      this.nodes.forEach(item => {
        if (item.serialNumber == this.makeMac(uuid)) {
          is = true;
        }
      });
      return is;
    },

    //return true if senzor is already found
    isSenzorInArray(uuid) {
      let is = false;
      this.senzors.forEach(item => {
        if (item.id == uuid) {
          is = true;
        }
      });
      return is;
    },

    //take data from server about hives
    takeDataHives() {
      let self = this;
      apolloClient
        .mutate({
          // Query
          mutation: myHives.HIVES
        })
        .then(data => {
          // Result
          self.nodes = data.data.currentAccount.hwSensors.nodes;
        })
        .catch(error => {
          // Error
          console.error(error);
        });
    },

    //update data about senzor
    upDateData(uuid, mac, rssi, temp, hum, volt) {
      this.senzors.forEach(item => {
        if (item.id == uuid) {
          item.rssi = rssi;
          item.temperature = temp;
          item.humidity = hum;
          item.voltage = volt;
        }
      });
    },

    //assign data about hives to senzor
    saveDataAboutHives(mac) {
      let sName, hName, siName;
      this.nodes.forEach(item => {
        if (item.serialNumber == mac) {
          sName = item.internalName;
          hName = item.activeHive.name;
          siName = item.activeHwHub.activeSite.name;
        }
      });

      this.senzors.forEach(item => {
        if (item.mac == mac) {
          item.senzorName = sName;
          item.hiveName = hName;
          item.siteName = siName;
        }
      });
    },

    //save new senzor to array
    saveSenzor(uuid, mac, rssi, temp, hum, volt) {
      console.log("saveSenzor");
      this.senzors.push({
        id: uuid,
        mac: mac,
        rssi: rssi,
        temperature: temp,
        humidity: hum,
        voltage: volt,
        senzorName: "",
        hiveName: "",
        siteName: ""
      });
      this.saveDataAboutHives(mac);
    },

    //take data from ruuvi and modify to values
    takeDataFromRuuvi(bufView, uuid, rssi) {
      let version = new Uint8Array(bufView.slice(0, 1));

      let temp = new Int16Array(bufView.slice(1, 3));
      let temperature = ((temp[0] << 8) | temp[1]) / 200; //in degrese celsius

      let hum = new Uint16Array(bufView.slice(3, 5));
      let humidity =
        Math.round(((((hum[0] << 8) | hum[1]) * 2.5) / 1000) * 100) / 100;

      let volt = new Uint16Array(bufView.slice(13, 15));
      let voltage = ((((volt[0] << 8) | volt[1]) >> 5) + 1600) / 1000; // in V

      let mac = this.makeMac(uuid);

      if (!this.isSenzorInArray(uuid)) {
        this.saveSenzor(uuid, mac, rssi, temperature, humidity, voltage);
      } else {
        this.busy = false;
        this.upDateData(uuid, mac, rssi, temperature, humidity, voltage);
      }
    },

    //scan using bluetooth
    scan() {
      this.enabledBluetooth();
      console.log("scanStart");
      let self = this;
      bluetooth
        .startScanning({
          seconds: 2,
          onDiscovered: function(peripheral) {
            console.log(peripheral.UUID);
            if (self.isSenzorYour(peripheral.UUID)) {
              let bufView = new Uint8Array(
                peripheral.advertismentData.manufacturerData
              );
              self.takeDataFromRuuvi(bufView, peripheral.UUID, peripheral.RSSI);
            }
          }
        })
        .then(
          function() {
            console.log("scanning complete");
          },
          function(err) {
            console.log("error while scanning: " + err);
          }
        );
    },

    // check if bluetooth is enabled
    enabledBluetooth() {
      bluetooth.isBluetoothEnabled().then(function(enabled) {
        console.log("Enabled? " + enabled);
        if (!enabled) {
          Dialogs.alert({
            title: "Bluetooth",
            message: "Prosím zapněte Bluetooth",
            okButtonText: "Zavřít"
          });
        } else {
        }
      });
    },

    //on tap button
    tap() {
      this.busy = true; //activity indivator
      this.scan();
      this.interval = setInterval(() => this.scan(), 5000);
    },

    //go back to webview and stop interval
    back() {
      clearInterval(this.interval);
      this.$navigateBack();
    }
  },

  data() {
    return {
      busy: false,  //Activity indicator
      senzors: [],  //Data about senzors
      nodes: []     //Data about hives from server
    };
  }
};
</script>
}
<style scoped>
GridLayout {
  margin: 20;
}
.icon {
  width: 20;
  lenght: 20;
  padding-left: 5;
  padding-right: 5;
}

.sen {
  background-color: #ffc107;
  padding-left: 5;
  padding-right: 5;
}

button {
  background-color: #ffc107;
  border: none;
  color: #ffffff;
}

ListView {
  height: 70%;
}

label {
  font-size: 15;
}
.site {
  color: #888888;
}
.sname {
  font-weight: bold;
}
</style>
