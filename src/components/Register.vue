/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

<template>
  <Page
    xmlns="http://schemas.nativescript.org/tns.xsd"
    @loaded="pageLoaded"
    actionBarHidden="true"
  >
    <web-view id="webView"></web-view>
  </Page>
</template>

<script>
import Web from "./Web";
import { WebViewInterface } from "nativescript-webview-interface";
import { WebView, LoadEventData } from "tns-core-modules//ui/web-view";

const webViewInterfaceModule = require("nativescript-webview-interface");
let ForsageWebViewInterface;  //webview interface

const appSettings = require("tns-core-modules/application-settings"); //local storage

export default {
  methods: {
    //login to app
    login(jwt) {
      appSettings.setString("token", jwt);
      this.$navigateTo(Web);
    },

    //listen trigger "login" from webview
    listenLangWebViewEvents() {
      // handles language selectionChange event.
      ForsageWebViewInterface.on("login", jwt => {
        console.log("Button on webview was click");
        this.login(jwt.jwt);
      });
    },

    //setup interface
    setupWebViewInterface(page) {
      let webView = page.getViewById("webView");
      let url = "https://app.forsage.net/users/register";
      ForsageWebViewInterface = new webViewInterfaceModule.WebViewInterface(
        webView,
        url
      );
      this.listenLangWebViewEvents();
    },

    //setup page
    pageLoaded(args) {
      let page = args.object;
      this.setupWebViewInterface(page);
    }
  },

  data() {
    return {
    };
  }
};
</script>

<style scoped></style>
