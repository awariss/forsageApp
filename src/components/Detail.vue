<template>
  <Page>
    <ActionB />
    <ScrollView orientation="horizontal">
      <GridLayout
        height="60%"
        width="90%"
        columns="*,1.8*"
        rows="2*,*,*,*,*,*,*,*,*,*,2*"
      >
        <Label row="0" col="0" colSpan="2" class="head" text="Detail senzoru" />

        <Label row="1" col="0" class="c" text="Jméno:" />
        <Label row="1" col="1" :text="senzor.senzorName" />

        <Label row="2" col="0" class="c" text="Úl:" />
        <Label row="2" col="1" :text="senzor.hiveName" />

        <Label row="3" col="0" class="c" text="Stanoviště:" />
        <Label row="3" col="1" :text="senzor.siteName" />

        <Label row="4" col="0" class="c" text="UUID:" />
        <Label row="4" col="1" :text="senzor.id" />

        <Label row="5" col="0" class="c" text="MAC:" />
        <Label row="5" col="1" :text="senzor.mac" />

        <Label row="6" col="0" class="c" text="RSSI:" />
        <Label row="6" col="1" :text="senzor.rssi" />

        <Label row="7" col="0" class="c" text="Baterie:" />
        <Label row="7" col="1" :text="senzor.voltage + ' V'" />

        <Label row="8" col="0" class="c" text="Teplota:" />
        <Label row="8" col="1" :text="senzor.temperature + ' °C'" />

        <Label row="9" col="0" class="c" text="Vlhkost:" />
        <Label row="9" col="1" :text="senzor.humidity + ' %'" />

        <Button row="10" col="0" colSpan="2" @tap="$modal.close" text="Zpět" />
      </GridLayout>
    </ScrollView>
  </Page>
</template>

<script>
import ActionB from "./ActionBar";
import Bluetooth from "./Bluetooth";

export default {
  props: {
    senzor: Object
  },

  components: {
    ActionB
  },

  methods: {},
  data() {
    return {};
  }
};
</script>

<style scoped>
.head {
  font-size: 15;
  font-weight: bold;
  text-align: center;
  margin-top: 5%;
}
label {
  margin: 5px;
}
.c {
  margin-left: 10%;
}

button {
  margin-bottom: 5%;
  background-color: #ffc107;
  border: none;
  color: #ffffff;
}
</style>
