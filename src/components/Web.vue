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
    <FlexboxLayout flexDirection="column">
      <web-view id="webView" height="100%"></web-view>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Login from "./Login";
import Web from "./Web";
import Bluetooth from "./Bluetooth";
import * as fetchUserPushNotificationDevices from "../../graphql/fetchUserPushNotificationDevices";
import { WebViewInterface } from "nativescript-webview-interface";
import { WebView, LoadEventData } from "tns-core-modules//ui/web-view";
import { isAndroid } from "@nativescript/core";
import { apolloClient } from "../main";

const webViewInterfaceModule = require("nativescript-webview-interface");
let ForsageWebViewInterface; //webview interface

const appSettings = require("tns-core-modules/application-settings");

export default {
  methods: {
    //logout from app
    logout() {
      appSettings.remove("token");
      this.$navigateTo(Login);
    },

    //change acount and reload webview
    changeAcount(jwt) {
      appSettings.setString("token", jwt);
      this.$navigateTo(Web);
    },

    //listen triggers from webview
    listenLangWebViewEvents() {

      //logout to logout from page
      ForsageWebViewInterface.on("logout", () => {
        console.log("Button on webview was click");
        this.logout();
      });

      //login to change account
      ForsageWebViewInterface.on("login", jwt => {
        console.log("Button on webview was click");
        this.changeAcount(jwt.jwt);
      });

      //menu_scan_sensors to change page to senzor page
      ForsageWebViewInterface.on("menu_scan_sensors", () => {
        console.log("Change direction to bluetooth");
        this.$navigateTo(Bluetooth);
      });

      /* For tested web
      ForsageWebViewInterface.on("click", jwt => {
        console.log("Button on webview was click");
        this.loadInWebView();
      });*/
    },

    //setup page
    setupWebViewInterface(page) {
      let webView = page.getViewById("webView");
      let url =
        "https://app.forsage.net/login?jwt=" + appSettings.getString("token");
      ForsageWebViewInterface = new webViewInterfaceModule.WebViewInterface(
        webView,
        url
      );

      //change userAgent to "ForsageApp"
      webView.on(WebView.loadFinishedEvent, LoadEventData => {
        if (isAndroid) {
          ForsageWebViewInterface.webView.android
            .getSettings()
            .setJavaScriptEnabled(true);
          let newUA = "ForsageApp";
          ForsageWebViewInterface.webView.android
            .getSettings()
            .setUserAgentString(newUA);
        } else {
          ForsageWebViewInterface.webView.ios.customUserAgent = "ForsageApp";
        }
      });
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
      url: ""
    };
  }
};
</script>

<style scoped></style>
