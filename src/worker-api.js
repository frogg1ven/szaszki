import Worker from 'worker-loader!./worker';
import store from "@/store/index.js";

const worker = new Worker();

worker.addEventListener('message', (e) => {
    store.commit("CHANGE_LAST_PART", e.data);
    store.commit("CHANGE_IP_COLOR", "success");
});

export function sendMessage(ip){
    worker.postMessage(ip)
}
