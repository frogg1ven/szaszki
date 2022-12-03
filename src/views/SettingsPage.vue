<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="center1">
        <div class="bg-img2">
          <ColorPicker :visible-formats="['rgb']" style="max-width: 100%" @color-change="updateColor">
            <template #hue-range-input-label>
              <span class="visually-hidden">Kolor</span>
            </template>
            <template #alpha-range-input-label>
              <span class="visually-hidden">Jasność</span>
            </template>
          </ColorPicker>
        </div>
        <div class="bg-img2">
          <ion-button class="ion-margin nice-btn ion-text-wrap" size="large" type="button" @click="changeColor(1)"
            expand="block">Zmień kolor jasnych pól
          </ion-button>
          <ion-button class="ion-margin nice-btn ion-text-wrap" size="large" type="button" @click="changeColor(0)"
            expand="block">Zmień kolor ciemnych pól
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import axios from "axios";
import store from "@/store/index.js";
import { ColorPicker } from "vue-accessible-color-picker";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    ColorPicker,
  },
  data() {
    return {
      color: { r: 1, g: 1, b: 1, a: 1 },
      storeColor: "#ffffff",
    };
  },
  methods: {
    changeColor(buttonNumber) {
      console.log(this.color);
      let url =
        "http://" +
        store.state.splitIP[0] +
        "." +
        store.state.splitIP[1] +
        "." +
        store.state.splitIP[2] +
        "." +
        store.state.lastPart +
        ":" +
        store.state.port +
        "/squareColor";
      console.log(url);
      let red = Math.round(this.color.r * 255), green = Math.round(this.color.g * 255), blue = Math.round(this.color.b * 255), alfa = Math.round(this.color.a * 255)
      console.log(red, blue, green, alfa)
      axios
        .get(url, {
          params: {
            s: buttonNumber,
            r: red,
            g: green,
            b: blue,
            a: alfa
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      buttonNumber
        ? this.$store.commit("CHANGE_WHITE_SQUARES_COLOR", this.storeColor)
        : this.$store.commit("CHANGE_BLACK_SQUARES_COLOR", this.storeColor);
    },
    updateColor(event) {
      this.color = event.colors.rgb;
      this.storeColor = event.colors.hex.slice(0, 7);
    },
  },
});
</script>