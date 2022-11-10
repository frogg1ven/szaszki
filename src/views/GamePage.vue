<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Szachy</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col class="center">
            <game />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/vue";
import Game from "@/components/Game/GameComponent.vue";
// import store from "@/store/index.js";

export default defineComponent({
  name: "GamePage",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    Game,
    IonGrid,
    IonCol,
    IonRow,
  },

});
</script>
