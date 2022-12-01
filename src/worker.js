import axios from "axios";

self.addEventListener("message", (e) => {
  let count = 0;
  let ip = e.data;
  var t = setInterval(
    (function scan() {
      let i, url;
      console.log("Pinging...");
      for (i = 0; i < 255; i++) {
        url = "http://" + ip[0] + "." + ip[1] + "." + ip[2] + "." + i + ":2391/ping";
        // console.log(url)
        const request = axios.CancelToken.source();
        const timeout = setTimeout(() => { request.cancel(); }, 9900);
        axios.get(url, { cancelToken: request.token })
          .then((res) => {
            console.log(
              "Znalezione ip to: ",
              ip[0] + "." + ip[1] + "." + ip[2] + "." + res.data
            );
            count = 6;
            clearTimeout(timeout);
            clearInterval(t);
            self.postMessage(res.data);
          })
          .catch((error) => {
            error;
          });
      }
      count++;
      if (count == 6) {
        clearInterval(t);
      }
      return scan;
    })(),
    10000
  );
});