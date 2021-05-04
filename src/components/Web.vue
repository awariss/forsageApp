<template>
  <Page
    xmlns="http://schemas.nativescript.org/tns.xsd"
    @loaded="pageLoaded"
    actionBarHidden="true"
  >
    <FlexboxLayout flexDirection="column">
      <web-view id="webView" height="90%"></web-view>
      <Button text="Bluetooth" @tap="tap"></Button>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Login from "./Login";
import Web from "./Web";
import Bluetooth from "./Bluetooth";
import { WebViewInterface } from "nativescript-webview-interface";
import { WebView, LoadEventData } from "tns-core-modules//ui/web-view";

const webViewInterfaceModule = require("nativescript-webview-interface");
let ForsageWebViewInterface;

const appSettings = require("tns-core-modules/application-settings");

export default {
  methods: {
    tap() {
      this.$navigateTo(Bluetooth);
    },

    logout() {
      appSettings.remove("token");
      this.$navigateTo(Login);
    },

    changeAcount(jwt) {
      appSettings.setString("token", jwt);
      this.$navigateTo(Web);
    },

    listenLangWebViewEvents() {
      // handles language selectionChange event.
      ForsageWebViewInterface.on("logout", () => {
        console.log("Button on webview was click");
        this.logout();
      });

      ForsageWebViewInterface.on("login", jwt => {
        console.log("Button on webview was click");
        this.changeAcount(jwt.jwt);
      });

      ForsageWebViewInterface.on("click", jwt => {
        console.log("Button on webview was click");
        this.loadInWebView();
      });
    },

    loadInWebView() {
      console.log("Emit webview");
      ForsageWebViewInterface.emit("mobileApp");
    },

    setupWebViewInterface(page) {
      let webView = page.getViewById("webView");
      let url =
        "https://app.forsage.net/login?jwt=" + appSettings.getString("token");
      ForsageWebViewInterface = new webViewInterfaceModule.WebViewInterface(
        webView,
        url
      );

      webView.on(WebView.loadFinishedEvent, LoadEventData => {
        this.loadInWebView();
      });
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
