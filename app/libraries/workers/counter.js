var interval = -1;
var counter = 0;

onmessage = function (e) {
  if (e.data.action === 'start') {
    counter = e.data.data;
    interval = setInterval(function () {
      postMessage(++counter);
    }, 60000);
  } else {
    clearInterval(interval);
  }
};