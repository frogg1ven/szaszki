<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>WiFi</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="center">
        <div class="bg-img2">
          <form @submit.prevent="sendCredentials">
            <div>
              <div class="ion-margin">
                <ion-input
                  class="input-border"
                  v-model="wifi.ssid"
                  name="ssid"
                  type="ssid"
                  placeholder="SSID"
                  ngModel
                  required
                ></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input
                  class="input-border"
                  v-model="wifi.password"
                  name="password"
                  type="password"
                  placeholder="Hasło"
                  ngModel
                  required
                ></ion-input>
              </div>
            </div>
            <div>
              <ion-button
                class="ion-margin nice-btn"
                size="large"
                type="submit"
                expand="block"
                >Wyślij dane logowania</ion-button
              >
            </div>
          </form>
          <hr />
          <div class="ion-margin">
                <ion-input
                  class="input-border"
                  v-model="ip"
                  name="ip"
                  type="ip"
                  :color=color
                  placeholder="Adres IP nie znaleziony"
                  ngModel
                  required
                ></ion-input>
              </div>
          <div>
            <ion-button
              class="ion-margin nice-btn"
              size="large"
              type="button"
              @click="manualAdd()"
              expand="block"
              >Dodaj ręcznie</ion-button
            >
          </div>
          <hr />
          <div>
            <ion-button
              class="ion-margin nice-btn"
              size="large"
              type="button"
              @click="disconnect()"
              expand="block"
              >Rozłącz WiFi</ion-button
            >
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
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from "@ionic/vue";
import axios from "axios";
import store from "@/store/index.js";
// import * as $ from "jquery";

const worker = new Worker("../workers/worker.js");

worker.onmessage = function(e) {
  console.log("worker data: ", e.data);
};

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
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
      color: "dark",
      error: null,
    };
  },
  methods: {
    getIP(callback) {
      let pc, myIP, noop;
      window.RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
      (pc = new RTCPeerConnection({ iceServers: [] })), (noop = function () {});
      pc.createDataChannel(""); //create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
      pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          myIP =
            /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
              ice.candidate.candidate
            )[1];
          pc.onicecandidate = noop;
          console.log(myIP.split("."));
          store.commit("CHANGE_SPLIT_IP", myIP.split("."));
          callback();
        }
      }
    },
    sendCredentials() {
      console.log("Wysyłanie danych logowania");

      // this.getIP(this.startWorker);
      this.startWorker();

      axios
        .get("http://192.168.1.1:2391/update", {
          params: { ssid: this.wifi.ssid, password: this.wifi.password },
        })
        .then((res) => {
          console.log(res.data);
          
        })
        .catch((error) => {
          console.log(error.message);
        });
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
          ":2391/ping";
          console.log(url);
        axios
          .get(url)
          .then((res) => {
            this.color = "success"
            console.log("res: ", res.data);
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
    startWorker(){
      worker.postMessage({
        // "ip": [store.state.splitIP[0], store.state.splitIP[1], store.state.splitIP[2]]
        "ip": [192, 168, 31]
      });
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
          ":2391/disconnect";
      axios
        .get(url)
        .then((res) => {
          console.log("Rozłączenie szachownicy, dane WiFi szachownicy zostały wykasowane")
          console.log(res.data);
          this.color = "dark";
          this.ip = "";
          store.commit("CHANGE_LAST_PART", 255);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async manualAdd(){
      this.color = "dark"
      let splitIP = this.ip.split(".");
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
          ":2391/ping";
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
  beforeMount(){
    this.color = "dark"
    // this.getIP(this.scan);
  },
});
</script>
