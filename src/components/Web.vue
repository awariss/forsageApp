<template>
    <Page xmlns="http://schemas.nativescript.org/tns.xsd" @loaded="pageLoaded" actionBarHidden="true">
      <web-view id="webView"></web-view>
    </Page>
</template>

<script >
import Login from './Login';
import { WebViewInterface } from 'nativescript-webview-interface';
import {WebView, LoadEventData} from 'tns-core-modules//ui/web-view';

var webViewInterfaceModule = require('nativescript-webview-interface');
var oLangWebViewInterface;

const appSettings = require("tns-core-modules/application-settings");

export default {

    methods: {

      logout(){
        appSettings.remove("token");
        this.$navigateTo(Login);
      },

      listenLangWebViewEvents(){
          // handles language selectionChange event.
          oLangWebViewInterface.on('logout', () => {
                console.log("Button on webview was click");
                this.logout();
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
</style>
