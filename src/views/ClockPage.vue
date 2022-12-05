<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="h95">
                <div class="bg-img2 h100">
                    <ion-grid class="size100">
                        <ion-row class="size45">
                            <ion-button :color="colorTop" class="ion-margin nice-btn ion-text-wrap btn-rotate" size="large" name="time"
                                type="button" @click="startTimer(0)" expand="block">{{ timeBtnTop }}
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
                                <ion-button class="nice-btn h80" type="button" @click="resetTimers()">
                                    <font-awesome-icon icon="fa fa-redo" style="font-size: 110%;" />
                                </ion-button>
                            </ion-col>
                            <ion-col />
                        </ion-row>
                        <ion-row class="size45">
                            <ion-button :color="colorBot" class="ion-margin nice-btn ion-text-wrap btn-non-rotate" size="large"
                                name="time" type="button" @click="startTimer(1)" expand="block">{{ timeBtnBot }}
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
            tempo: {
                min: 5,
                sec: 0
            },
            increment: 5,
            topTimer: {
                min: 5,
                sec: 0
            },
            botTimer: {
                min: 5,
                sec: 0
            },
            time: 0,
            timeBtnBot : "05:00",
            timeBtnTop : "05:00",
            isRunning: false,
            colorTop: "primary",
            colorBot: "primary",
        };
    },
    methods: {
        startTimer(turn) {
            // inkrementacja czasu (dopiero po drugim wciśnięciu zegara)
            if(this.isRunning){
                turn ? (this.botTimer.sec += this.increment,  this.botTimer.sec >= 60 ? (this.botTimer.min++, this.botTimer.sec %= 60) : null):
                (this.topTimer.sec += this.increment,  this.topTimer.sec >= 60 ? (this.topTimer.min++, this.topTimer.sec %= 60) : null);                
                this.prettify(!turn);
            }
            this.isRunning = true;
            turn ? (this.colorBot = "primary", this.colorTop = "secondary") : (this.colorBot = "secondary", this.colorTop = "primary");
            clearInterval(timer);
            turn ? this.time = this.topTimer.min * 60 + this.topTimer.sec : this.time = this.botTimer.min * 60 + this.botTimer.sec;
            timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--
                    turn ? this.topTimer.min = parseInt(this.time / 60) : this.botTimer.min = parseInt(this.time / 60);
                    turn ? this.topTimer.sec = Math.round(this.time - this.topTimer.min * 60) : this.botTimer.sec = Math.round(this.time - this.botTimer.min * 60);
                    this.prettify(turn);
                }
                else {
                    clearInterval(timer);
                    this.isRunning = false;
                }
            }, 1000)

        },
        prettify(turn) {
            let m, s;
            turn ? (m = this.topTimer.min, s = this.topTimer.sec) : (m = this.botTimer.min, s = this.botTimer.sec);
            if (m < 10 )    m = "0" + m;
            if (s < 10)     s = "0" + s;
            turn ? this.timeBtnTop = m + ":" + s : this.timeBtnBot = m + ":" + s;
        },
        resetTimers() {
            clearInterval(timer);
            this.isRunning = false;
            this.topTimer.sec = this.botTimer.sec = this.tempo.sec; 
            this.topTimer.min = this.botTimer.min = this.tempo.min;
            this.prettify(0); this.prettify(1);
        },
    },

});
</script>