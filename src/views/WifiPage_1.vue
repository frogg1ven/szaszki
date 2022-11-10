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
                <ion-input class="input-border" v-model="wifi.ssid" name="ssid" type="ssid" placeholder="SSID" ngModel required></ion-input>
              </div>
              <div class="ion-margin">
                <ion-input class="input-border" v-model="wifi.password" name="password" type="password" placeholder="Hasło" ngModel required></ion-input>
              </div>
            </div>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="submit" expand="block">Wyślij dane logowania</ion-button>        
            </div>
            <hr>
            <div>
              <ion-button class="ion-margin nice-btn" size="large" type="button" @click="disconnect()" expand="block">Rozłącz WiFi</ion-button>        
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton, 
} from '@ionic/vue';
import axios from "axios"

export default defineComponent({
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton },
  data() {
    return {
      wifi: {
        ssid: '',
        password: ''
      },
    };
  },
    methods: {
    sendCredentials(){
      console.log("Wysyłanie danych")
      axios.get("http://123", {params: {ssid: this.wifi.ssid, password: this.wifi.password}})
      // axios.get("http://192.168.1.1:2391/update", {params: {ssid: this.wifi.ssid, password: this.wifi.password}})
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    disconnect(){
      window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
      let pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
      pc.createDataChannel('');//create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
      pc.onicecandidate = function(ice)
      {
        if (ice && ice.candidate && ice.candidate.candidate){
          let myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
          console.log('my IP: ', myIP);   
          pc.onicecandidate = noop;
          let mySplitIP = myIP.split(".")
          let url = "http://" + mySplitIP[0] + "." + mySplitIP[1] + "." + mySplitIP[2] + ".254:2391/led";
          console.log(url)
          axios.get(url, {params: {disconnect: ""}})
          .then(res => {
            console.log(res)
          }).catch(error => {
            console.log(error.message);
          });
        }
      };
    }
  },
});
</script>
