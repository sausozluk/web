var interval = -1;
var counter = 0;

onmessage = function (e) {
  postMessage(counter);
  if (e.data === "start") {
    interval = setInterval(function () {
      postMessage(++counter);
    }, 60000);
  } else {
    clearInterval(interval);
  }
};