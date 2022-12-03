<template>
  <ion-page>
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
                  max="15"
                  color="secondary"
                  step="1"
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
                  max="15"
                  color="secondary"
                  step="1"
                  debounce="500"
                  @ionChange="changeColor(selectedColorBlack, 0)"
                  v-model="selectedColorBlack"
                >
                </ion-range>
              </ion-row>
            </ion-col>
          </ion-item>
        </div>
        <div class="bg-img2">
          <ColorPicker 
            :visible-formats="['rgb']"
            alpha-channel="hide"
          >
            <template #hue-range-input-label>
            <span class="visually-hidden">Hue</span>
            </template>
            <template #alpha-range-input-label>
              <span class="visually-hidden">Alpha</span>
            </template>
          </ColorPicker>
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
  IonLabel,
  IonRow,
  IonCol,
  IonRange,
  IonItem,
} from "@ionic/vue";
import axios from "axios";
import store from "@/store/index.js";
import { ColorPicker } from 'vue-accessible-color-picker'

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonCol,
    IonRow,
    IonRange,
    IonItem,
    ColorPicker,
  },
  data() {
    return {
      selectedEffect: null,
      selectedColorWhite: "15",
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
      let url = "http://" + store.state.splitIP[0] + "." + store.state.splitIP[1] + "." + 
                store.state.splitIP[2] + "." + store.state.lastPart + ":" + store.state.port + "/squareColor"
      console.log(url);
      axios
        .get(url, {
          params: { square: c, color: selectedColor}
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      return c ? this.$store.commit("CHANGE_WHITE_SQUARES_COLOR", this.color[selectedColor]) : this.$store.commit("CHANGE_BLACK_SQUARES_COLOR", this.color[selectedColor]);
    },
  },
});
</script>
