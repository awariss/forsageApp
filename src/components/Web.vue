<template>
    <Page xmlns="http://schemas.nativescript.org/tns.xsd" @loaded="pageLoaded" actionBarHidden="true">
      <FlexboxLayout flexDirection="column" >
      <web-view id="webView" height="90%"></web-view>
      <Button text="BLue"  @tap="tap"></Button>
      </FlexboxLayout>
    </Page>
</template>

<script >
import Login from './Login';
import Web from './Web'
import Bluetooth from './Bluetooth'
import { WebViewInterface } from 'nativescript-webview-interface';
import {WebView, LoadEventData} from 'tns-core-modules//ui/web-view';

var webViewInterfaceModule = require('nativescript-webview-interface');
var oLangWebViewInterface;

const appSettings = require("tns-core-modules/application-settings");

export default {

    methods: {
      tap(){
        this.$navigateTo(Bluetooth);
      },

      logout(){
        appSettings.remove("token");
        this.$navigateTo(Login);
      },

      changeAcount(jwt){
        appSettings.setString('token',jwt);
        this.$navigateTo(Web);
      },

      listenLangWebViewEvents(){
          // handles language selectionChange event.
          oLangWebViewInterface.on('logout', () => {
                console.log("Button on webview was click");
                this.logout();
          });
          oLangWebViewInterface.on('login', (jwt) => {
                console.log("Button on webview was click");
                this.changeAcount(jwt.jwt);
          });
      },

      setupWebViewInterface(page){
          var webView = page.getViewById('webView');
          var url= "https://app.forsage.net/login?jwt="+appSettings.getString('token');
          oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, url);
          this.listenLangWebViewEvents();
      },

      pageLoaded(args){
          var page = args.object;
          this.setupWebViewInterface(page);
      },
    },


    data() {
      return {
        url:'',
      }
    }

}

</script>

<style scoped>

.bt{}
</style>
