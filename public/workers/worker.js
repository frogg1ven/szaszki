// public/workers/example.worker.js
self.importScripts("https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js");

// Listen to every message posted from the Worker initializator
self.addEventListener('message', function(MessageEvent) {

  let ip = MessageEvent.data.ip;
  console.log(ip);
  let count = 0;

  var t = setInterval(function(){
    let i, url;
  for (i = 0; i < 255; i++) {
    url =
      "http://" +
      ip[0] +
      "." +
      ip[1] +
      "." +
      ip[2] +
      "." +
      i +
      ":2391/ping";
    console.log(url)
    axios
      .get(url)
      .then((res) => {
        console.log("znalezione ip to: ", 
          splitIP[0] + "." + splitIP[1] + "." + splitIP[2] + "." + res.data);
        self.postMessage({
          "result": res.data
        })
        clearInterval(t);  
        count = 29;
      })
      .catch((error) => {});
  }
    count++;
    if (count == 29){
      clearInterval(t);
    }
  }, 5000);

}, false);

