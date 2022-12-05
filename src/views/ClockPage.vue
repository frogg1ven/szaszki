<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="h95">
                <div class="bg-img2 h100">
                    <ion-grid class="size100">
                        <ion-row class="size45">
                            <ion-button class="ion-margin nice-btn ion-text-wrap btn-rotate" size="large" name="time"
                                type="button" @click="startTimer(1)" expand="block">{{ timeBtn1 }}
                            </ion-button>
                        </ion-row>
                        <ion-row style="height: 8%;">
                            <ion-col />
                            <ion-col>
                                <ion-button class="nice-btn h80" type="button">
                                    <ion-icon :icon="settingsOutline" />
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button class="nice-btn h80" type="button">
                                    <font-awesome-icon icon="fa fa-redo" style="font-size: 110%;" />
                                </ion-button>
                            </ion-col>
                            <ion-col />
                        </ion-row>
                        <ion-row class="size45">
                            <ion-button class="ion-margin nice-btn ion-text-wrap btn-non-rotate" size="large"
                                name="time" type="button" @click="startTimer(0)" expand="block">{{ timeBtn2 }}
                            </ion-button>
                        </ion-row>
                    </ion-grid>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { defineComponent } from "vue";
import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/vue";
import { settingsOutline } from 'ionicons/icons';


let timer;

export default defineComponent({
    setup() {
        return {
            settingsOutline,
        }
    },
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon
    },
    data() {
        return {
            minutesTop: 5,
            secondsTop: 0,
            minutesBot: 5,
            secondsBot: 0,
            time: 0,
            timeBtn1 : "05:00",
            timeBtn2 : "05:00",
        };
    },
    methods: {
        startTimer(turn) {
            clearInterval(timer);
            turn ? this.time = this.minutesTop * 60 + this.secondsTop : this.time = this.minutesBot * 60 + this.secondsBot;
            timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--
                    turn ? this.minutesTop = parseInt(this.time / 60) : this.minutesBot = parseInt(this.time / 60);
                    turn ? this.secondsTop = Math.round(this.time - this.minutesTop * 60) : this.secondsBot = Math.round(this.time - this.minutesBot * 60);
                    this.prettify(turn);
                }
                else {
                    clearInterval(timer);
                }
            }, 1000)

        },
        prettify(turn) {
            let m, s;
            turn ? (m = this.minutesTop, s = this.secondsTop) : (m = this.minutesBot, s = this.secondsBot);
            if (m < 10 && s < 10) {
                turn ? this.timeBtn1 = "0" + m + ":0" + s : this.timeBtn2 = "0" + m + ":0" + s;
            }
            else if (m > 10 && s < 10) {
                 turn ? this.timeBtn1 =  m + ":0" + s : this.timeBtn2 =  m + ":0" + s;
            }
            else if (m < 10 && s > 10) {
                turn ? this.timeBtn1 =  "0" + m + ":" + s : this.timeBtn2 =  "0" + m + ":" + s;
            }
            else {
                turn ? this.timeBtn1 =  m + ":" + s : this.timeBtn2 =  m + ":" + s;
            }
        },
    },
    computed: {
    }

});
</script>