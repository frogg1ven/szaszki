<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="center">
        <div class="bg-img2">
          <form @submit.prevent="sendCredentials">
            <div>
              <div class="ion-margin">
                <ion-input class="input-border" v-model="wifi.ssid" name="ssid" type="ssid" placeholder="SSID" ngModel
                  required></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input class="input-border" v-model="wifi.password" name="password" type="password"
                  placeholder="Hasło" ngModel required></ion-input>
              </div>
            </div>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="submit" expand="block">Wyślij dane logowania
              </ion-button>
            </div>
          </form>
          <hr />
          <div class="ion-margin">
            <ion-input class="input-border" v-model="ip" name="ip" type="ip" :color=ipColor
              placeholder="Adres IP nie znaleziony" ngModel required></ion-input>
          </div>
          <div>
            <ion-button class="ion-margin nice-btn" size="large" type="button" @click="manualAdd" expand="block">Dodaj
              ręcznie</ion-button>
          </div>
          <hr />
          <div>
            <ion-button class="ion-margin nice-btn" size="large" type="button" @click="disconnect" expand="block">
              Rozłącz WiFi
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
} from "@ionic/vue";
import axios from "axios";
import store from "@/store/index.js";
// import * as $ from "jquery";

import { sendMessage } from '../worker-api';
// import { ping } from '../worker-api';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
  },
  data() {
    return {
      wifi: {
        ssid: "",
        password: "",
      },
      ip: "",
    };
  },
  computed: {
    ipColor() {
      return store.state.ipColor;
    },
    ipInput() {
      return store.state.lastPart != 255 ? store.state.splitIP[0] + "." +
        store.state.splitIP[1] + "." + store.state.splitIP[2] + "." +
        store.state.lastPart : false;
    }
  },
  methods: {
    getIP(callback) {
      let pc, ip, noop;
      window.RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
      (pc = new RTCPeerConnection({ iceServers: [] })), (noop = function () {});
      pc.createDataChannel(""); //create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
      pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          ip =
            /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
              ice.candidate.candidate
            )[1];
          pc.onicecandidate = noop;
          console.log(ip.split("."));
          store.commit("CHANGE_SPLIT_IP", ip.split("."));
          callback(ip.split("."));
        }
      }
    },
    sendCredentials() {
      console.log("Wysyłanie danych logowania");
      axios
        .get("http://192.168.1.1:" + store.state.port + "/update", {
          params: { ssid: this.wifi.ssid, password: this.wifi.password },
        })
        .then((res) => {
          console.log(res.data);

        })
        .catch((error) => {
          console.log(error.message);
        });
      this.getIP(sendMessage);
    },
    scan() {
      let i, url;
      for (i = 0; i < 255; i++) {
        url =
          "http://" +
          store.state.splitIP[0] +
          "." +
          store.state.splitIP[1] +
          "." +
          store.state.splitIP[2] +
          "." +
          i +
          ":" + store.state.port + "/ping";
        console.log(url);
        axios
          .get(url)
          .then((res) => {
            store.commit("CHANGE_IP_COLOR", "success");
            store.commit("CHANGE_LAST_PART", res.data);
            console.log("znalezione ip to: ",
              store.state.splitIP[0] + "." + store.state.splitIP[1] + "." + store.state.splitIP[2] + "." + store.state.lastPart);
            i = 255;
            this.ip = store.state.splitIP[0] + "." + store.state.splitIP[1] + "." + store.state.splitIP[2] + "." + store.state.lastPart
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    disconnect() {
      console.log("Wysyłanie danych logowania");
      let url = "http://" +
        store.state.splitIP[0] +
        "." +
        store.state.splitIP[1] +
        "." +
        store.state.splitIP[2] +
        "." +
        store.state.lastPart +
        ":" + store.state.port + "/disconnect";
      axios
        .get(url)
        .then((res) => {
          console.log("Rozłączenie szachownicy, dane WiFi szachownicy zostały wykasowane")
          console.log(res.data);
          store.commit("CHANGE_IP_COLOR", "dark");
          store.commit("CHANGE_LAST_PART", 255);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async manualAdd() {
      let splitIP = this.ip.split(".");
      console.log("manual: ", this.ip);
      store.commit("CHANGE_IP_COLOR", "dark");
      store.commit("CHANGE_SPLIT_IP", splitIP);
      store.commit("CHANGE_LAST_PART", splitIP[3]);
      let url = "http://" +
        store.state.splitIP[0] +
        "." +
        store.state.splitIP[1] +
        "." +
        store.state.splitIP[2] +
        "." +
        store.state.lastPart +
        ":" + store.state.port + "/ping";
      await axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          console.log("Podany adres IP jest prawidłowy.")
          this.color = "success"
        })
        .catch((error) => {
          console.log(error.message);
          this.color = "danger"
        });
    },
  },
  beforeMount() {
    store.commit("CHANGE_IP_COLOR", "dark");
    this.getIP(this.scan);
  },
});
</script>
