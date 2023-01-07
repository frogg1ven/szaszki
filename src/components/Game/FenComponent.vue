<template>
  <ion-grid class="ion-no-padding">
    <ion-row>
      <ion-button
        class="ion-text-wrap nice-btn btn-send"
        @click="sendFenToChessboard()"
      >
        Wyślij pozycję
        <font-awesome-icon
          style="margin-left: 10px"
          icon="fa-solid fa-paper-plane"
        />
      </ion-button>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-button class="ion-text-wrap nice-btn btns-top" @click="defaultFen">
          Ustawienie początkowe
          <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button class="ion-text-wrap nice-btn btns-top" @click="emptyFen">
          Wyczyść szachownicę
          <ion-icon :icon="trashOutline" />
        </ion-button>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-select
        class="select-wide select-border"
        interfaceOptions="customPopoverOptions"
        @ionChange="changeTurn()"
        v-model="selectedTurn"
        interface="popover"
        placeholder="Ruch białych"
      >
        <ion-select-option class="select-option-style" value="white"
          >Ruch białych</ion-select-option
        >
        <ion-select-option class="select-option-style" value="black"
          >Ruch czarnych</ion-select-option
        >
      </ion-select>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <template v-slot:end>
            <ion-checkbox
              class="no-padding"
              v-model="castle.ooW"
              @ionChange="castleCheckbox(0)"
            ></ion-checkbox>
          </template>
          <ion-label>Białe O-O</ion-label>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-checkbox
            class="no-padding"
            slot="end"
            v-model="castle.oooW"
            @ionChange="castleCheckbox(1)"
          ></ion-checkbox>
          <ion-label>O-O-O</ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-checkbox
            class="no-padding"
            slot="end"
            v-model="castle.ooB"
            @ionChange="castleCheckbox(2)"
          ></ion-checkbox>
          <ion-label>Czarne O-O</ion-label>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-checkbox
            class="no-padding"
            slot="end"
            v-model="castle.oooB"
            @ionChange="castleCheckbox(3)"
          ></ion-checkbox>
          <ion-label>O-O-O</ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-input
        class="input-border"
        v-model="computedFen"
        placeholder="FEN notation here..."
        style="text-align: center"
      ></ion-input>
    </ion-row>
    <ion-row>
      <ion-item style="width: 100%">
        <ion-label>Silnik szachowy</ion-label>
        <ion-toggle slot="end" v-model="chessEngine.engineOn"></ion-toggle>
      </ion-item>
    </ion-row>
    <ion-row>
      <ion-select
        class="select-wide select-border"
        interfaceOptions="customPopoverOptions"
        :disabled="!chessEngine.engineOn"
        v-model="chessEngine.engineSide"
        interface="popover"
        placeholder="Silnik rusza czarnymi bierkami"
      >
        <ion-select-option class="select-option-style" value="white"
          >Silnik rusza białymi bierkami</ion-select-option
        >
        <ion-select-option class="select-option-style" value="black"
          >Silnik rusza czarnymi bierkami</ion-select-option
        >
      </ion-select>
    </ion-row>
  </ion-grid>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonToggle,
} from "@ionic/vue";
import store from "@/store/index.js";
import { trashOutline } from "ionicons/icons";
import axios from "axios";

export default defineComponent({
  components: {
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonToggle,
  },
  setup() {
    return {
      trashOutline,
    };
  },
  data() {
    return {
      castle: {
        ooW: true,
        oooW: true,
        ooB: true,
        oooB: true,
      },
      selectedTurn: "white",
      fenString: "",
      chessEngine: {
        engineOn: false,
        engineSide: "black",
      },
    };
  },
  methods: {
    castleCheckbox(side) {
      switch (side) {
        case 0:
          store.commit("UPDATE_CASTLE", { side: 0, val: this.castle.ooW });
          break;
        case 1:
          store.commit("UPDATE_CASTLE", { side: 1, val: this.castle.oooW });
          break;
        case 2:
          store.commit("UPDATE_CASTLE", { side: 2, val: this.castle.ooB });
          break;
        case 3:
          store.commit("UPDATE_CASTLE", { side: 3, val: this.castle.oooB });
          break;
      }
    },
    changeTurn() {
      store.commit("CHANGE_TURN", this.selectedTurn);
    },
    emptyFen() {
      store.commit("EMPTY_FEN");
      console.log(store.state.fen);
    },
    defaultFen() {
      store.commit("DEFAULT_FEN");
      console.log(store.state.fen);
    },
    sendFenToChessboard() {
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
        "/setFen";
      let engineFen = "";
      this.chessEngine.engineOn ? (engineFen += "1") : (engineFen += "0");
      this.chessEngine.engineSide == "white"
        ? (engineFen += "0")
        : (engineFen += "1");
      console.log(store.state.fen + " " + engineFen);
      axios
        .get(url, {
          params: {
            fen: store.state.fen + " " + engineFen,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    updateFen() {
      this.fenString != store.fenString
        ? (this.fenString = store.state.fen)
        : this.fenString;
      return this.fenString;
    },
  },
  computed: {
    computedFen() {
      return this.fenString != store.fenString
        ? this.updateFen()
        : this.fenString;
    },
  },
});
</script>
