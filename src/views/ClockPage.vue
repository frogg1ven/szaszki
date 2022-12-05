<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="h95">
                <div class="bg-img2 h100">
                    <ion-grid class="size100">
                        <ion-row class="size45">
                            <ion-button :color="colorTop" class="ion-margin nice-btn ion-text-wrap btn-rotate"
                                size="large" name="time" type="button" @click="startTimer(0)" expand="block">
                                {{ timeBtnTop }}
                            </ion-button>
                        </ion-row>
                        <ion-row style="height: 8%;">
                            <ion-col class="w100">
                                <ion-button class="nice-btn h80 w100" type="button" style="padding-left: 10%;"
                                    id="popover-button">
                                    <ion-icon :icon="settingsOutline" />
                                </ion-button>
                                <ion-popover trigger="popover-button" :dismiss-on-select="true" class="custom">
                                    <ion-content>
                                        <ion-list no-lines>
                                            <ion-item-group>
                                                <ion-item-divider>
                                                    <ion-label>
                                                        Szybkie
                                                    </ion-label>
                                                </ion-item-divider>
                                                <ion-item :button="true" :detail="false">10 min.</ion-item>
                                                <ion-item :button="true" :detail="false">15 | 10</ion-item>
                                                <ion-item :button="true" :detail="false">30 min.</ion-item>
                                                <ion-item-divider>
                                                    <ion-label>
                                                        Blitz
                                                    </ion-label>
                                                </ion-item-divider>
                                                <ion-item :button="true" :detail="false">3 min.</ion-item>
                                                <ion-item :button="true" :detail="false">3 | 2</ion-item>
                                                <ion-item :button="true" :detail="false">5 min.</ion-item>
                                                <ion-item-divider>
                                                    <ion-label>
                                                        Bullet
                                                    </ion-label>
                                                </ion-item-divider>
                                                <ion-item :button="true" :detail="false">1 min.</ion-item>
                                                <ion-item :button="true" :detail="false">1 | 1</ion-item>
                                                <ion-item :button="true" :detail="false">2 | 1</ion-item>
                                                <ion-item-divider>
                                                    <ion-label>
                                                        Inne...
                                                    </ion-label>
                                                </ion-item-divider>
                                                <ion-item :button="true" @click="popoverOpen=true" >Wybierz ręcznie</ion-item>
                                            </ion-item-group>
                                            <ion-popover :dismiss-on-select="false" class="custom" :is-open="popoverOpen" 
                                                :event="event" @didDismiss="popoverOpen = false">
                                                <!-- <ion-item lines="none">
                                                    <ion-label style="width: 50%;"> Minuty </ion-label>
                                                    <ion-input class="input-border ion-text-center" v-model="tempo.min"
                                                        placeholder="Minuty" style="margin: 10px;"></ion-input>
                                                </ion-item>
                                                <ion-item lines="none">
                                                    <ion-label style="width: 50%;"> Sekundy </ion-label>
                                                    <ion-input class="input-border ion-text-center" v-model="tempo.sec"
                                                        placeholder="Sekundy" style="margin: 10px;"></ion-input>
                                                </ion-item>
                                                <ion-item lines="none">
                                                    <ion-label style="width: 50%;"> Inkrement </ion-label>
                                                    <ion-input class="input-border ion-text-center" v-model="increment"
                                                        placeholder="Inkrement" style="margin: 10px;">
                                                    </ion-input>
                                                </ion-item> -->
                                                <ion-item lines="none">
                                                    <ion-button class="ion-margin nice-btn" size="large" @click="openPopover($event)"
                                                        type="button" expand="block" style="width: 100%;">OK
                                                    </ion-button>
                                                </ion-item>
                                            </ion-popover>
                                        </ion-list>
                                    </ion-content>
                                </ion-popover>
                            </ion-col>
                            <ion-col class="w100">
                                <ion-button class="nice-btn h80 w100" type="button" style="padding-right: 10%;"
                                    @click="resetTimers()">
                                    <font-awesome-icon icon="fa fa-redo" style="font-size: 110%;" />
                                </ion-button>
                            </ion-col>
                        </ion-row>
                        <ion-row class="size45">
                            <ion-button :color="colorBot" class="ion-margin nice-btn ion-text-wrap btn-non-rotate"
                                size="large" name="time" type="button" @click="startTimer(1)" expand="block">
                                {{ timeBtnBot }}
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
import {  IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonItem, IonList, IonPopover, IonLabel, IonItemDivider, IonItemGroup } from "@ionic/vue";
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
        IonIcon,
        IonItem,
        IonList,
        IonPopover,
        IonLabel,
        IonItemDivider,
        IonItemGroup,
        
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
            timeBtnBot: "05:00",
            timeBtnTop: "05:00",
            isRunning: false,
            colorTop: "primary",
            colorBot: "primary",
            popoverOpen: false,
            event: null,
        };
    },
    methods: {
        startTimer(turn) {
            // inkrementacja czasu (dopiero po drugim wciśnięciu zegara)
            if (this.isRunning) {
                turn ? (this.botTimer.sec += this.increment, this.botTimer.sec >= 60 ? (this.botTimer.min++, this.botTimer.sec %= 60) : null) :
                    (this.topTimer.sec += this.increment, this.topTimer.sec >= 60 ? (this.topTimer.min++, this.topTimer.sec %= 60) : null);
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
            if (m < 10) m = "0" + m;
            if (s < 10) s = "0" + s;
            turn ? this.timeBtnTop = m + ":" + s : this.timeBtnBot = m + ":" + s;
        },
        resetTimers() {
            clearInterval(timer);
            this.isRunning = false;
            this.topTimer.sec = this.botTimer.sec = this.tempo.sec;
            this.topTimer.min = this.botTimer.min = this.tempo.min;
            this.prettify(0); this.prettify(1);
            this.colorBot = "primary", this.colorTop = "primary";
        },
        openPopover(e){
            this.event = e;
            this.popoverOpen = false;
            console.log(e, this.popoverOpen)
        }
    },

});
</script>