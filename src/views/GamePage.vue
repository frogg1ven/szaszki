<template>
  <ion-page>
    <ion-content :style="this.overflowCondition ? '--overflow:auto' : '--overflow:hidden'">
      <ion-grid class="no-padding">
        <ion-row>
          <game />
        </ion-row>
        <div class="bg-img2" style="margin: 5px;">
          <ion-row>
            <ion-col>
              <fen-input />
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import Game from "@/components/Game/GameComponent.vue";
import FenInput from "@/components/Game/FenComponent.vue"
import store from "@/store/index.js";

export default defineComponent({
  name: "GamePage",
  components: {
    IonContent,
    IonPage,
    Game,
    IonGrid,
    IonRow,
    FenInput,
    IonCol
  },
  computed: {
    overflowCondition() {
      return store.state.overflow ? true : false;
    }
  }

});
</script>
