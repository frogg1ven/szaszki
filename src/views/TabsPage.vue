<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="game" href="/tabs/game">
          <font-awesome-icon icon="fa fa-chess-board" style="font-size: 25px;"/>
          <ion-label>Szachy</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="wifi" href="/tabs/wifi">
          <ion-icon :icon="wifi" />
          <ion-label>Wi-Fi</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon :icon="settings" />
          <ion-label>Ustawienia</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { wifi, settings } from 'ionicons/icons';


export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      wifi, 
      settings,
    }
  }
});
</script>
