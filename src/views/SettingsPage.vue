<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ustawienia</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="center1">
        <div class="bg-img2">
          <ion-item>
            <ion-col>
              <ion-row>
                <ion-label class="label-text">Kolor pola białego</ion-label>
              </ion-row>
              <ion-row>
                <div class="rainbow"></div>
              </ion-row>
              <ion-row>
                <ion-range
                  min="0"
                  max="255"
                  color="secondary"
                  step="15"
                  debounce="500"
                  @ionChange="changeColor(selectedColorWhite, 1)"
                  v-model="selectedColorWhite"
                >
                </ion-range>
              </ion-row>
            </ion-col>
          </ion-item>
        </div>

        <div class="bg-img2">
          <ion-item>
            <ion-col>
              <ion-row>
                <ion-label class="label-text">Kolor pola czarnego</ion-label>
              </ion-row>
              <ion-row>
                <div class="rainbow"></div>
              </ion-row>
              <ion-row>
                <ion-range
                  min="0"
                  max="255"
                  color="secondary"
                  step="15"
                  debounce="500"
                  @ionChange="changeColor(selectedColorBlack, 0)"
                  v-model="selectedColorBlack"
                >
                </ion-range>
              </ion-row>
            </ion-col>
          </ion-item>
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
  IonLabel,
  IonRow,
  IonCol,
  IonRange,
  IonItem,
} from "@ionic/vue";
import axios from "axios";
import color from "@/components/Game/GameComponent.vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCol,
    IonRow,
    IonRange,
    IonItem,
  },
  data() {
    return {
      selectedEffect: null,
      selectedColorWhite: "255",
      selectedColorBlack: "0",
      color: [
        "#000000",
        "#ff0000",
        "#ebaf3f",
        "#fffb18",
        "#75ce00",
        "#56D500",
        "#00FF00",
        "#00D52A",
        "#00AB55",
        "#0056AA",
        "#0000FF",
        "#2A00D5",
        "#8000ff",
        "#ac00af",
        "#d10069",
        "#FFFFFF",
      ],
    };
  },
  methods: {
    changeColor(selectedColor, c) {
      let param = selectedColor;
      this.selectedEffect = null;
      window.RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
      let pc = new RTCPeerConnection({ iceServers: [] }),
        noop = function () {};
      pc.createDataChannel(""); //create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
      pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          let myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
          console.log("my IP: ", myIP);
          pc.onicecandidate = noop;
          let mySplitIP = myIP.split(".");
          let url =
            "http://" +
            mySplitIP[0] +
            "." +
            mySplitIP[1] +
            "." +
            mySplitIP[2] +
            ".254:2391/led";
          console.log(url);
          axios
            .get(url, { params: { currentColor: param } })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      };
      c ? color.value.light = this.color[param / 15 - 1] : color.value.dark = this.color[param / 15 - 1];
      return c ? this.$store.commit("CHANGE_WHITE_SQUARES_COLOR", this.color[param / 15 - 1]) : this.$store.commit("CHANGE_BLACK_SQUARES_COLOR", this.color[param / 15 - 1]);
    },
  },
});
</script>
