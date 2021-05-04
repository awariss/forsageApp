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
let oLangWebViewInterface;

const appSettings = require("tns-core-modules/application-settings");

export default {
  methods: {
    login(jwt) {
      appSettings.setString("token", jwt);
      this.$navigateTo(Web);
    },

    listenLangWebViewEvents() {
      // handles language selectionChange event.
      oLangWebViewInterface.on("login", jwt => {
        console.log("Button on webview was click");
        this.login(jwt.jwt);
      });
    },

    setupWebViewInterface(page) {
      let webView = page.getViewById("webView");
      let url = "https://app.forsage.net/users/register";
      oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(
        webView,
        url
      );
      this.listenLangWebViewEvents();
    },

    pageLoaded(args) {
      let page = args.object;
      this.setupWebViewInterface(page);
    }
  },

  data() {
    return {
      url: ""
    };
  }
};
</script>

<style scoped></style>
